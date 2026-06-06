"use client"

import { useState } from "react"

export function AIAssistant() {
  const [reply, setReply] = useState("")
  const [listening, setListening] = useState(false)

  async function startListening() {
    if (listening) return

    setListening(true)

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const chunks: Blob[] = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      console.log("🎤 Recording stopped")

      // 🔴 STOP UI + MIC
      setListening(false)
      stream.getTracks().forEach((track) => track.stop())

      const audioBlob = new Blob(chunks, { type: "audio/webm" })
      console.log("Audio blob size:", audioBlob.size)

      const formData = new FormData()
      formData.append("audio", audioBlob)

      const transcribeRes = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      })

      console.log("Transcribe status:", transcribeRes.status)

      const transcribeData = await transcribeRes.json()
      console.log("Transcribe data:", transcribeData)

      const { text, language } = transcribeData

      if (!text) {
        console.warn("❌ No speech detected")
        setReply("❌ No speech detected")
        return
      }

      const chatRes = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language }),
      })

      console.log("Chat status:", chatRes.status)

      const data = await chatRes.json()
      console.log("Chat reply:", data)

      setReply(data.reply)
    }

    mediaRecorder.start()

    setTimeout(() => {
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop()
      }
    }, 4000)
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 w-80 z-50">
      <h4 className="font-semibold mb-2">AgroVerse AI Assistant</h4>

      <button
        onClick={startListening}
        disabled={listening}
        className={`px-4 py-2 rounded text-white ${
          listening ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        {listening ? "🎙️ Listening..." : "🎤 Speak"}
      </button>

      {reply && (
        <p className="mt-3 text-sm text-gray-700">
          <strong>AI:</strong> {reply}
        </p>
      )}
    </div>
  )
}