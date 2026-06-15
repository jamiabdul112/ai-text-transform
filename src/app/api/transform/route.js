import Groq from "groq-sdk";

function buildInstruction(mode, tone, target){
    
    let instruction = "You are a helpful writing assistant. Be clear, consise, and your responses should be easily reusable. Do not add extra commentary.";
    
    if(mode === "summarize"){
        return `${instruction} Perform the following action: Summarize the following text into a maximum of 5 bullet points.`;
    }
    else if(mode === "rewrite"){
        return `${instruction} Perform the following action: Rewrite the following text in a ${tone} tone, you should preserve the meaning of the text.`;
    }
    else if(mode === "translate"){
        return `${instruction} Perform the following action: Translate the following text to ${target}, dont change the names, brand or product names.`;
    }
}

export async function POST(request){

    try{
        const {input, mode, tone, target} = await request.json();

        const cleanedInput = input ? input.trim() : "";
        
        if(!cleanedInput){
            return Response.json({error:"Text Required"}, {status:400})
        }

        const client = new Groq({
            apiKey:process.env.GROQ_API_KEY
        });

        const aiResponse = await client.chat.completions.create({
            model: "llama-3.3-70b-versatile", 
            messages: [
                {
                    role: "system",
                    content: buildInstruction(mode, tone, target)
                },
                {
                    role: "user",
                    content: cleanedInput
                }
            ],
            temperature: 0.5,
        });

        const textResponse = aiResponse?.choices?.[0]?.message?.content?.trim() || "";
        return Response.json({output:textResponse});
    
    }
    catch (error) {
        console.error(error);
        return Response.json({error:"Failed to transform text"}, {status:500});
    }
}