"use client"

import { Droplets, Thermometer, Sprout, Fish } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { growthStages } from "@/lib/agri-data"

interface LiveInputsProps {
  soil: number
  setSoil: (value: number) => void
  water: number
  setWater: (value: number) => void
  stage: string
  setStage: (value: string) => void
  integrated: boolean
  setIntegrated: (value: boolean) => void
}

export function LiveInputs({
  soil,
  setSoil,
  water,
  setWater,
  stage,
  setStage,
  integrated,
  setIntegrated,
}: LiveInputsProps) {
  const getSoilStatus = (value: number) => {
    if (value < 30) return { label: "Dry", color: "text-orange-500" }
    if (value < 60) return { label: "Optimal", color: "text-primary" }
    return { label: "Saturated", color: "text-blue-500" }
  }

  const getWaterStatus = (value: number) => {
    if (value < 4) return { label: "Low", color: "text-orange-500" }
    if (value <= 7) return { label: "Optimal", color: "text-primary" }
    return { label: "High", color: "text-blue-500" }
  }

  const soilStatus = getSoilStatus(soil)
  const waterStatus = getWaterStatus(water)

  return (
    <Card className="border-0 shadow-xl shadow-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-accent" />
          </div>
          <div>
            <CardTitle className="text-xl">Live Sensor Inputs</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time farm conditions simulation</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Soil Moisture */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Droplets className="w-4 h-4 text-muted-foreground" />
                Soil Moisture
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{soil}%</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-card ${soilStatus.color}`}>
                  {soilStatus.label}
                </span>
              </div>
            </div>
            <Slider
              value={[soil]}
              onValueChange={(v) => setSoil(v[0])}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0% (Dry)</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

          {/* Water Level */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Droplets className="w-4 h-4 text-muted-foreground" />
                Water Level
              </Label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{water} cm</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full bg-card ${waterStatus.color}`}>
                  {waterStatus.label}
                </span>
              </div>
            </div>
            <Slider
              value={[water]}
              onValueChange={(v) => setWater(v[0])}
              min={0}
              max={15}
              step={0.5}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 cm</span>
              <span>15 cm</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Growth Stage */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Sprout className="w-4 h-4 text-muted-foreground" />
              Growth Stage
            </Label>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="h-12 bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {growthStages.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Integrated Farming Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Fish className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium">Integrated Farming</p>
                <p className="text-xs text-muted-foreground">Fish/Duck in paddy field</p>
              </div>
            </div>
            <Switch checked={integrated} onCheckedChange={setIntegrated} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
