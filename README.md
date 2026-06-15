# 🔤 AI Text Transformer

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square) ![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-green?style=flat-square) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square)

A minimal, fast AI-powered text tool that lets you **summarize**, **rewrite**, and **translate** any text — built with Next.js App Router and the Groq API (Llama 3.3 70B).

## ✨ Features

- **Summarize** — condenses any text into up to 5 clear bullet points
- **Rewrite** — rewrites text in your chosen tone: Simple, Professional, Friendly, or Funny
- **Translate** — translates text to Tamil, English, or Hindi while preserving names and brand terms
- **Load Sample** — one-click demo text so you can test instantly
- **Copy output** — copies the result to clipboard in one click
- Clean dark UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Framework** — Next.js 14 (App Router)
- **AI** — Groq API with `llama-3.3-70b-versatile`
- **Styling** — Tailwind CSS
- **Language** — JavaScript (React)

## 📁 Project Structure

```
ai-text-transform/
├── app/
│   ├── page.jsx          # Main UI (mode switcher, input/output)
│   └── api/
│       └── transform/
│           └── route.js  # POST handler → Groq API call
├── .env.local            # GROQ_API_KEY goes here
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jamiabdul112/ai-text-transform.git
cd ai-text-transform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your Groq API key

Create a `.env.local` file in the root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free key at https://console.groq.com

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🔌 API Reference

**POST** `/api/transform`

Request body:

```json
{
  "input": "Your text here",
  "mode": "summarize" | "rewrite" | "translate",
  "tone": "simple" | "professional" | "friendly" | "funny",
  "target": "tamil" | "english" | "hindi"
}
```

Response:

```json
{
  "output": "Transformed text..."
}
```

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Your Groq API key (required) |

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

