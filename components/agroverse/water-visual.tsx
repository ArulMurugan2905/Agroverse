"use client"

import { Droplets, Fish } from "lucide-react"

interface WaterVisualProps {
  water: number
  integrated?: boolean
}

export function WaterVisual({ water, integrated = false }: WaterVisualProps) {
  const percentage = Math.min((water / 15) * 100, 100)
  const getWaterColor = () => {
    if (water < 4) return "from-orange-400/30 to-orange-500/50"
    if (water <= 7) return "from-primary/30 to-primary/50"
    return "from-blue-400/30 to-blue-500/50"
  }

  return (
    <div className="relative h-32 rounded-2xl bg-gradient-to-b from-muted to-muted/50 overflow-hidden border border-border">
      {/* Water Level */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${getWaterColor()} transition-all duration-500`}
        style={{ height: `${percentage}%` }}
      >
        {/* Animated wave effect */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>

      {/* Fish icons if integrated farming */}
      {integrated && water >= 4 && (
        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-4">
          <Fish className="w-6 h-6 text-accent animate-bounce" style={{ animationDelay: "0ms" }} />
          <Fish className="w-5 h-5 text-accent animate-bounce" style={{ animationDelay: "200ms" }} />
          <Fish className="w-6 h-6 text-accent animate-bounce" style={{ animationDelay: "400ms" }} />
        </div>
      )}

      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <Droplets className="w-8 h-8 mx-auto text-foreground/50 mb-1" />
          <p className="text-2xl font-bold">{water} cm</p>
          <p className="text-xs text-muted-foreground">Water Level</p>
        </div>
      </div>

      {/* Scale markers */}
      <div className="absolute right-3 inset-y-4 flex flex-col justify-between text-xs text-muted-foreground">
        <span>15</span>
        <span>10</span>
        <span>5</span>
        <span>0</span>
      </div>
    </div>
  )
}
