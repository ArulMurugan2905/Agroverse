// app/api/transcribe/route.ts
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  try {
    console.log(
      "KEY LOADED:",
      process.env.OPENAI_API_KEY?.slice(0, 8)
    )

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!,
    })

    const formData = await req.formData()
    const audio = formData.get("audio")

    if (!audio || !(audio instanceof File)) {
      return NextResponse.json(
        { error: "Audio file missing" },
        { status: 400 }
      )
    }

    const audioFile = new File(
      [await audio.arrayBuffer()],
      "audio.webm",
      { type: "audio/webm" }
    )

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    })

    return NextResponse.json({
      text: transcription.text,
      language: "en",
    })
  } catch (error) {
    console.error("❌ Whisper error:", error)
    return NextResponse.json(
      { error: "Whisper transcription failed" },
      { status: 500 }
    )
  }
}