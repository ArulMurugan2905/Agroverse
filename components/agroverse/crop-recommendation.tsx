"use client"

import type React from "react"
import {
  Bot,
  User,
  Sparkles,
  Droplets,
  Clock,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Fish,
  Bird,
  Egg,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { FarmData } from "./farmer-dashboard"

// Inlined crop data with full details
const crops = [
  {
    name: "Rice",
    soils: ["Clay", "Loamy", "Silt"],
    textures: ["Loamy", "Clayey", "Silty"],
    risk: "Low",
    baseProfit: 45000,
    waterRequirement: "High",
    growthDuration: "120-150 days",
    integrated: ["Fish", "Duck"],
  },
  {
    name: "Wheat",
    soils: ["Loamy", "Clay", "Sandy"],
    textures: ["Loamy", "Sandy", "Clayey"],
    risk: "Low",
    baseProfit: 38000,
    waterRequirement: "Medium",
    growthDuration: "100-120 days",
    integrated: [],
  },
  {
    name: "Cotton",
    soils: ["Sandy", "Loamy"],
    textures: ["Sandy", "Loamy"],
    risk: "High",
    baseProfit: 65000,
    waterRequirement: "Medium",
    growthDuration: "150-180 days",
    integrated: ["Poultry"],
  },
  {
    name: "Sugarcane",
    soils: ["Loamy", "Clay"],
    textures: ["Loamy", "Clayey"],
    risk: "Medium",
    baseProfit: 55000,
    waterRequirement: "High",
    growthDuration: "12-18 months",
    integrated: ["Fish"],
  },
  {
    name: "Maize",
    soils: ["Loamy", "Sandy", "Silt"],
    textures: ["Loamy", "Sandy", "Silty"],
    risk: "Medium",
    baseProfit: 42000,
    waterRequirement: "Medium",
    growthDuration: "90-120 days",
    integrated: ["Poultry"],
  },
  {
    name: "Soybean",
    soils: ["Loamy", "Clay"],
    textures: ["Loamy", "Clayey"],
    risk: "Medium",
    baseProfit: 48000,
    waterRequirement: "Medium",
    growthDuration: "80-120 days",
    integrated: ["Duck", "Poultry"],
  },
]

type Crop = (typeof crops)[number]

interface CropRecommendationProps {
  data: FarmData
}

export function CropRecommendation({ data }: CropRecommendationProps) {
  const suitable = crops.filter(
    (c) => c.soils.includes(data.soil) && c.textures.includes(data.texture)
  )

  const systemPick =
    suitable.find((c) => c.risk === data.risk) || suitable[0] || crops[0]
  const farmerPick =
    data.preferred && data.preferred !== "auto"
      ? crops.find((c) => c.name === data.preferred)
      : null

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-orange-500 bg-orange-500/10"
      case "Medium":
        return "text-amber-500 bg-amber-500/10"
      case "Low":
        return "text-emerald-600 bg-emerald-600/10"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getWaterColor = (water: string) => {
    switch (water) {
      case "High":
        return "text-blue-500"
      case "Medium":
        return "text-sky-500"
      case "Low":
        return "text-cyan-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getIntegratedIcon = (type: string) => {
    switch (type) {
      case "Fish":
        return Fish
      case "Duck":
        return Bird
      case "Poultry":
        return Egg
      default:
        return Fish
    }
  }

  const CropCard = ({
    crop,
    title,
    icon: Icon,
    variant,
  }: {
    crop: Crop
    title: string
    icon: React.ElementType
    variant: "system" | "farmer"
  }) => {
    const isSystem = variant === "system"

    return (
      <div
        className={`relative rounded-xl overflow-hidden ${
          isSystem
            ? "bg-gradient-to-br from-primary/5 via-background to-primary/5 border-2 border-primary/30 shadow-lg shadow-primary/5"
            : "bg-muted/50 border border-border/50"
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 border-b ${
            isSystem ? "border-primary/20 bg-primary/5" : "border-border/50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isSystem
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/10 text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {title}
                </p>
                <h3 className="text-xl font-bold">{crop.name}</h3>
              </div>
            </div>
            {isSystem && (
              <Badge className="bg-primary text-primary-foreground border-0 gap-1">
                <Sparkles className="w-3 h-3" />
                AI Pick
              </Badge>
            )}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Profit */}
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <IndianRupee className="w-3 h-3" />
                Profit / Acre
              </div>
              <p className="text-lg font-bold text-emerald-600">
                ₹{crop.baseProfit.toLocaleString()}
              </p>
            </div>

            {/* Duration */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Clock className="w-3 h-3" />
                Duration
              </div>
              <p className="text-sm font-semibold">{crop.growthDuration}</p>
            </div>

            {/* Water Need */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <Droplets className="w-3 h-3" />
                Water Need
              </div>
              <p className={`text-sm font-semibold ${getWaterColor(crop.waterRequirement)}`}>
                {crop.waterRequirement}
              </p>
            </div>

            {/* Risk Level */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <AlertTriangle className="w-3 h-3" />
                Risk Level
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${getRiskColor(crop.risk)}`}
              >
                {crop.risk}
              </span>
            </div>
          </div>

          {/* Integrated Farming Badges */}
          {crop.integrated.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Integrated Farming Options
              </p>
              <div className="flex flex-wrap gap-2">
                {crop.integrated.map((item) => {
                  const IntegratedIcon = getIntegratedIcon(item)
                  return (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="gap-1.5 px-3 py-1 bg-sky-500/10 text-sky-600 border border-sky-500/20 hover:bg-sky-500/15"
                    >
                      <IntegratedIcon className="w-3.5 h-3.5" />
                      {item}
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className="border border-border/50 shadow-lg overflow-hidden">
      <CardHeader className="border-b border-border/50 bg-muted/30 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">
              Crop Decision Analysis
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendation based on your farm data
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Comparison Grid */}
        <div
          className={`grid gap-4 ${farmerPick ? "md:grid-cols-2" : "grid-cols-1 max-w-md"}`}
        >
          <CropCard
            crop={systemPick}
            title="AgroVerse Recommends"
            icon={Bot}
            variant="system"
          />
          {farmerPick && (
            <CropCard
              crop={farmerPick}
              title="Your Preference"
              icon={User}
              variant="farmer"
            />
          )}
        </div>

        {/* Why This Recommendation - Highlighted Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent" />
          <div className="relative p-5 border-2 border-amber-500/30 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-amber-600" />
              </div>
              <h4 className="font-semibold text-base">
                Why {systemPick.name}?
              </h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Optimal match for{" "}
                  <strong className="text-foreground">{data.soil}</strong> soil
                  with{" "}
                  <strong className="text-foreground">{data.texture}</strong>{" "}
                  texture
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Aligns with your{" "}
                  <strong className="text-foreground">
                    {data.risk.toLowerCase()} risk
                  </strong>{" "}
                  profit preference
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Suitable for{" "}
                  <strong className="text-foreground">{data.land} acre</strong>{" "}
                  cultivation area
                </span>
              </li>
              {systemPick.integrated.length > 0 && (
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Supports integrated farming with{" "}
                    <strong className="text-foreground">
                      {systemPick.integrated.join(" & ")}
                    </strong>{" "}
                    for extra income
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Profit Comparison Alert */}
        {farmerPick && farmerPick.name !== systemPick.name && (
          <div
            className={`flex items-start gap-3 p-4 rounded-xl ${
              systemPick.baseProfit > farmerPick.baseProfit
                ? "bg-emerald-500/5 border border-emerald-500/20"
                : "bg-amber-500/5 border border-amber-500/20"
            }`}
          >
            <ArrowRight
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                systemPick.baseProfit > farmerPick.baseProfit
                  ? "text-emerald-500"
                  : "text-amber-500"
              }`}
            />
            <p className="text-sm">
              {systemPick.baseProfit > farmerPick.baseProfit ? (
                <>
                  <strong className="text-emerald-600">
                    AgroVerse recommendation
                  </strong>{" "}
                  could yield{" "}
                  <strong className="text-emerald-600">
                    ₹
                    {(
                      systemPick.baseProfit - farmerPick.baseProfit
                    ).toLocaleString()}
                  </strong>{" "}
                  more per acre
                </>
              ) : (
                <>
                  Your preferred crop{" "}
                  <strong className="text-foreground">{farmerPick.name}</strong>{" "}
                  has higher profit potential but may carry different risk
                  factors
                </>
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
