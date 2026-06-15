"use client"

import { useState } from "react";

export default function Home() {

  const [mode, setMode] = useState("summarize");
  const [tone, setTone] = useState("simple");
  const [target, setTarget] = useState("tamil");

  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const MODES = [
    {
      key:"summarize",
      label: "Summarize",
    },
    {
      key:"rewrite",
      label: "Rewrite",
    },
    {
      key:"translate",
      label: "Translate",
    }
  ]

  function loadSample(){
     setText("The Sun is a star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to millions of degrees by nuclear fusion reactions in its core. The Sun radiates energy in the form of light and heat, which are essential for life on Earth. It is the largest object in the Solar System, containing more than 99.8% of the system's total mass.") 
  }

  function clearText(){
    setText("");
    setOutput("");
  }

  async function transformText(){
    setLoading(true);
    setOutput("");

    try{
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input:text, 
          mode, 
          tone: mode === "rewrite" ? tone : undefined, 
          target: mode === "translate" ? target : undefined}),
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(data.error || "Failed to transform text");
      }

      setOutput(data.output);
      
    }catch(error){
      console.error(error);
      alert("Failed to transform text");
    }finally{
      setLoading(false);
    }
 
  }

  async function onCopy(){
    if(!output) return;
    await navigator.clipboard.writeText(output);
    alert("Text copied to clipboard");
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            AI Text Transformer
          </h1>
          <p className="mt-2 text-zinc-300">
            Summarize, rewrite, and translate
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
          {/* Mode buttons + actions */}
          <div className="flex flex-wrap items-center gap-2">
            {
              MODES.map((m) => (
                <button key={m.key} onClick={() => setMode(m.key)} 
                className = {[ "rounded-full px-4 py-2 text-sm font-medium transition",
                  mode === m.key ? "bg-zinc-100 text-zinc-900" : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                 ].join(" ")}>
                  {m.label}
                </button>
              ))
            }
            

            
          </div>

          {/* Two-column layout */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {/* Left: Input */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm text-zinc-300">Input</label>
                <div className="flex gap-3">
                <p onClick={loadSample} className="underline text-zinc-300 text-xs cursor-pointer">
                  Load Sample
                </p>
                <p onClick={clearText} className="underline text-red-300 text-xs cursor-pointer">Clear</p>
                </div>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here…"
                className="h-64 w-full resize-none rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 mt-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
              />

              {/* Tone dropdown (for Rewrite mode) */}
              {mode === "rewrite" &&  (
                <>
                <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-300">Tone</span>
                <select onChange={(e) => setTone(e.target.value)} value={tone} className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                  <option value="simple">Simple</option>
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="funny">Funny</option>
                </select>
              </div>
              </>
              )}

              {mode === "translate" && (
                <>
                  {/* Target language (for Translate mode) */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-300">Target</span>
                    <select onChange={(e) => setTarget(e.target.value)} value={target} className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-sm text-zinc-100">
                      <option value="tamil">Tamil</option>
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                    </select>
                  </div>
                </>
              )}
              

              {/* Transform button */}
              
              <button onClick={transformText} className="w-full rounded-xl bg-emerald-400 px-3 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-300">
                {loading ? "Thinking..." : "Transform"}
              </button>
            </div>

            {/* Right: Output */}
            <div className="space-y-3">
              <label className="text-sm text-zinc-300">Output</label>
              <div className="h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 mt-4 text-sm text-zinc-100">

              {!loading ? (
                <>
                {output ? (
                  <span className="text-zinc-100">
                    {output}
                  </span>
                ) : (
                  <span className="text-zinc-500">
                    Your transformed text will appear here.
                  </span>
                )}
                </>

              ) : "Thinking..."}
                
              </div>
              <button onClick={onCopy} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
                Copy
              </button>
              
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-xs text-zinc-500">
          <p className="text-xs text-zinc-500">
                Tip: Use “Load sample” for quick demos.
              </p>
        </footer>
      </div>
    </main>
  );
}
