"use client"

import React from "react"

import { Droplets, AlertTriangle, CheckCircle2, XCircle, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IrrigationDecisionProps {
  soil: number
  water: number
  stage: string
  integrated: boolean
}

type DecisionType = "irrigate" | "drain" | "maintain" | "critical"

interface Decision {
  type: DecisionType
  title: string
  message: string
  action: string
}

export function IrrigationDecision({ soil, water, stage, integrated }: IrrigationDecisionProps) {
  const getDecision = (): Decision => {
    // Critical stages need more water
    const criticalStages = ["Flowering", "Grain Fill"]
    const isCritical = criticalStages.includes(stage)
    
    // Minimum water for integrated farming
    const minWaterForIntegrated = integrated ? 4 : 2

    if (soil < 20 && water < minWaterForIntegrated) {
      return {
        type: "critical",
        title: "Critical: Immediate Irrigation Required",
        message: `Soil moisture at ${soil}% is dangerously low. Water level at ${water}cm is insufficient${integrated ? " for fish/duck survival" : ""}.`,
        action: "Irrigate immediately to 6-8 cm",
      }
    }

    if (water < minWaterForIntegrated) {
      return {
        type: "irrigate",
        title: "Irrigation Recommended",
        message: `Water level at ${water}cm is below optimal${integrated ? " and may stress integrated livestock" : ""}. ${isCritical ? `Critical ${stage} stage requires adequate water.` : ""}`,
        action: `Increase water level to ${integrated ? "5-7" : "4-6"} cm`,
      }
    }

    if (water > 10) {
      return {
        type: "drain",
        title: "Drainage Recommended",
        message: `Water level at ${water}cm is too high. Excess standing water can cause root damage and disease.`,
        action: "Drain excess water to 5-7 cm",
      }
    }

    if (soil > 80 && water > 8) {
      return {
        type: "drain",
        title: "Mild Drainage Advised",
        message: "Soil is near saturation and water level is high. Consider light drainage to prevent waterlogging.",
        action: "Reduce water level to 6-7 cm",
      }
    }

    return {
      type: "maintain",
      title: "Conditions Optimal",
      message: `Soil moisture at ${soil}% and water at ${water}cm are within ideal range for ${stage} stage${integrated ? " and integrated farming" : ""}.`,
      action: "No action needed - continue monitoring",
    }
  }

  const decision = getDecision()

  const decisionStyles: Record<DecisionType, { bg: string; border: string; icon: React.ReactNode; badge: string }> = {
    critical: {
      bg: "bg-destructive/5",
      border: "border-destructive/20",
      icon: <AlertTriangle className="w-6 h-6 text-destructive" />,
      badge: "bg-destructive/10 text-destructive",
    },
    irrigate: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <ArrowUp className="w-6 h-6 text-blue-600" />,
      badge: "bg-blue-100 text-blue-700",
    },
    drain: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: <ArrowDown className="w-6 h-6 text-orange-600" />,
      badge: "bg-orange-100 text-orange-700",
    },
    maintain: {
      bg: "bg-primary/5",
      border: "border-primary/20",
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      badge: "bg-primary/10 text-primary",
    },
  }

  const style = decisionStyles[decision.type]

  return (
    <Card className={`border-2 ${style.border} ${style.bg}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-sm">
              {style.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{decision.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Smart Irrigation Decision</p>
            </div>
          </div>
          <Badge className={style.badge}>
            {decision.type === "maintain" ? <Minus className="w-3 h-3 mr-1" /> : <Droplets className="w-3 h-3 mr-1" />}
            {decision.type.charAt(0).toUpperCase() + decision.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{decision.message}</p>
        
        <div className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Recommended Action</p>
            <p className="font-medium text-sm">{decision.action}</p>
          </div>
        </div>

        {/* Current Status Bar */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-xs text-muted-foreground">Soil</p>
            <p className="font-bold text-primary">{soil}%</p>
          </div>
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-xs text-muted-foreground">Water</p>
            <p className="font-bold text-primary">{water} cm</p>
          </div>
          <div className="text-center p-2 bg-card rounded-lg">
            <p className="text-xs text-muted-foreground">Stage</p>
            <p className="font-bold text-primary text-xs">{stage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
