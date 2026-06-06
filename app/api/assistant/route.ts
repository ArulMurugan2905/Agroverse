// app/api/assistant/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const { message, language } = await req.json()

    const systemPrompt = `
You are AgroVerse AI assistant.
You help farmers navigate the app and understand recommendations.
Explain things simply.
If language is Tamil, reply in Tamil.
If Hindi, reply in Hindi.
If Marathi, reply in Marathi.
If English, reply in English.
Do not hallucinate.
`

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    })

    return NextResponse.json({
      reply: response.output_text,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "AI error" },
      { status: 500 }
    )
  }
}