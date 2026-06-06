"use client"

import { Leaf, Droplets, Sprout, Sun, FlaskConical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface FertilizerAdvisorProps {
  stage: string
}

interface StageAdvice {
  nitrogen: number
  phosphorus: number
  potassium: number
  description: string
  tips: string[]
  priority: "high" | "medium" | "low"
}

export function FertilizerAdvisor({ stage }: FertilizerAdvisorProps) {
  const stageAdvice: Record<string, StageAdvice> = {
    Germination: {
      nitrogen: 20,
      phosphorus: 80,
      potassium: 30,
      description: "Focus on root development with phosphorus-rich fertilizers",
      tips: ["Apply DAP at 50kg/acre", "Ensure adequate soil moisture", "Avoid nitrogen overdose"],
      priority: "medium",
    },
    Seedling: {
      nitrogen: 40,
      phosphorus: 60,
      potassium: 40,
      description: "Balanced nutrition for early vegetative growth",
      tips: ["First urea split: 25kg/acre", "Monitor leaf color closely", "Check for nutrient deficiencies"],
      priority: "medium",
    },
    Tillering: {
      nitrogen: 80,
      phosphorus: 30,
      potassium: 50,
      description: "High nitrogen demand for tiller production",
      tips: ["Second urea split: 35kg/acre", "Crucial stage for yield", "Maintain water level 5-7cm"],
      priority: "high",
    },
    "Stem Extension": {
      nitrogen: 60,
      phosphorus: 20,
      potassium: 60,
      description: "Moderate nitrogen with increasing potassium",
      tips: ["Final urea application if needed", "Start potassium supplement", "Watch for pest pressure"],
      priority: "medium",
    },
    Heading: {
      nitrogen: 30,
      phosphorus: 20,
      potassium: 80,
      description: "Reduce nitrogen, maximize potassium for grain development",
      tips: ["No more nitrogen application", "Foliar potassium spray helpful", "Critical water management"],
      priority: "high",
    },
    Flowering: {
      nitrogen: 20,
      phosphorus: 20,
      potassium: 90,
      description: "Maximum potassium requirement for grain filling",
      tips: ["Potassium sulfate: 20kg/acre", "Maintain consistent moisture", "Avoid any stress"],
      priority: "high",
    },
    "Grain Fill": {
      nitrogen: 10,
      phosphorus: 10,
      potassium: 70,
      description: "Minimal fertilizer, focus on plant health",
      tips: ["No major fertilizer needed", "Monitor for diseases", "Gradual water reduction"],
      priority: "low",
    },
    Maturity: {
      nitrogen: 0,
      phosphorus: 0,
      potassium: 20,
      description: "No fertilizer application - prepare for harvest",
      tips: ["Stop irrigation 2 weeks before harvest", "Plan harvest timing", "Monitor grain moisture"],
      priority: "low",
    },
  }

  const advice = stageAdvice[stage] || stageAdvice["Germination"]

  const priorityColors = {
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-accent/10 text-accent border-accent/20",
    low: "bg-primary/10 text-primary border-primary/20",
  }

  return (
    <Card className="border-0 shadow-xl shadow-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Fertilizer Advisor</CardTitle>
              <p className="text-sm text-muted-foreground">Stage-specific NPK recommendations</p>
            </div>
          </div>
          <Badge className={priorityColors[advice.priority]}>
            {advice.priority === "high" ? "High Priority" : advice.priority === "medium" ? "Moderate" : "Low Priority"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Stage */}
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
          <Sprout className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Current Growth Stage</p>
            <p className="font-semibold">{stage}</p>
          </div>
        </div>

        {/* NPK Levels */}
        <div className="space-y-4">
          <p className="text-sm font-medium">NPK Requirements</p>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  Nitrogen (N)
                </span>
                <span className="font-medium">{advice.nitrogen}%</span>
              </div>
              <Progress value={advice.nitrogen} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  Phosphorus (P)
                </span>
                <span className="font-medium">{advice.phosphorus}%</span>
              </div>
              <Progress value={advice.phosphorus} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  Potassium (K)
                </span>
                <span className="font-medium">{advice.potassium}%</span>
              </div>
              <Progress value={advice.potassium} className="h-2 bg-primary/20 [&>div]:bg-primary" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 bg-primary/5 rounded-xl">
          <p className="text-sm">{advice.description}</p>
        </div>

        {/* Tips */}
        <div>
          <p className="text-sm font-medium mb-3">Action Items</p>
          <ul className="space-y-2">
            {advice.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
