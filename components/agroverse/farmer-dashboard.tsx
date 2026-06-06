"use client"

import React from "react"

import { useState } from "react"
import { MapPin, Layers, Fingerprint, Wheat, TrendingUp, ArrowRight, Flame, Scale, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
const soilTypes = ["Clay", "Sandy", "Loamy", "Silt", "Peaty", "Chalky", "Saline"]
const textureTypes = ["Loamy", "Sandy", "Clayey", "Silty", "Gravelly"]
const regionOptions = ["North India", "South India", "East India", "West India", "Central India", "North-East India"]
const crops = [
  { name: "Rice" },
  { name: "Wheat" },
  { name: "Cotton" },
  { name: "Sugarcane" },
  { name: "Maize" },
  { name: "Soybean" },
  { name: "Groundnut" },
  { name: "Mustard" },
  { name: "Pulses" },
  { name: "Vegetables" },
]

export interface FarmData {
  land: number
  soil: string
  texture: string
  risk: string
  preferred: string
}

interface FarmerDashboardProps {
  onSubmit: (data: FarmData) => void
}

export function FarmerDashboard({ onSubmit }: FarmerDashboardProps): React.JSX.Element {
  const [land, setLand] = useState(2)
  const [soil, setSoil] = useState("Clay")
  const [texture, setTexture] = useState("Loamy")
  const [region, setRegion] = useState("North India")
  const [risk, setRisk] = useState("Medium")
  const [preferred, setPreferred] = useState("")

  const handleSubmit = () => {
    onSubmit({ land, soil, texture, risk, preferred })
  }

  const riskOptions = [
    { value: "High", label: "Max Profit", sublabel: "High Risk", icon: Flame, color: "text-orange-500" },
    { value: "Medium", label: "Balanced", sublabel: "Medium Risk", icon: Scale, color: "text-amber-500" },
    { value: "Low", label: "Stable", sublabel: "Low Risk", icon: Shield, color: "text-emerald-600" },
  ]

  return (
    <Card className="border border-border/50 shadow-lg overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-muted/30 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Farm Setup</CardTitle>
            <CardDescription className="text-sm">Enter your farm details for smart suggestions</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Land Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              Your Land Size
            </Label>
            <span className="text-xl font-bold text-primary tabular-nums">
              {land} <span className="text-xs font-normal text-muted-foreground">acres</span>
            </span>
          </div>
          <Slider
            value={[land]}
            onValueChange={(v) => setLand(v[0])}
            min={0.5}
            max={50}
            step={0.5}
            className="py-1"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0.5 acre</span>
            <span>50 acres</span>
          </div>
        </div>

        {/* Soil & Region Group */}
        <div className="space-y-4 p-4 rounded-lg bg-muted/40 border border-border/50">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Soil & Location Details</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-muted-foreground" />
                Soil Type
              </Label>
              <Select value={soil} onValueChange={setSoil}>
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                Soil Texture
              </Label>
              <Select value={texture} onValueChange={setTexture}>
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {textureTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                Region
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Preferred Crop */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Wheat className="w-4 h-4 text-muted-foreground" />
            Crop You Want to Grow
            <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
          </Label>
          <Select value={preferred} onValueChange={setPreferred}>
            <SelectTrigger className="h-11 bg-background border-border/50">
              <SelectValue placeholder="Let AgroVerse Decide" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Let AgroVerse Decide</SelectItem>
              {crops.map((crop) => (
                <SelectItem key={crop.name} value={crop.name}>{crop.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Risk Preference */}
        <div className="space-y-3">
          <Label className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            How Do You Want to Earn?
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {riskOptions.map((option) => {
              const Icon = option.icon
              const isSelected = risk === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setRisk(option.value)}
                  className={`relative p-3 rounded-lg border transition-all text-center ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border/50 bg-background hover:border-border hover:bg-muted/50"
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1.5 ${option.color}`} />
                  <p className="font-medium text-sm">{option.label}</p>
                  <p className="text-[11px] text-muted-foreground">{option.sublabel}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full h-12 text-sm font-semibold gap-2">
          Get AI Recommendations
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
