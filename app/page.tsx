"use client"

import { useState, useEffect } from "react"
import { Leaf, LogOut, Settings, ChevronRight, Sprout, BarChart3, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIAssistant } from "@/components/agroverse/AIAssistant"
// AgroVerse Components
import { Login } from "@/components/agroverse/login"
import { FarmerDashboard, type FarmData } from "@/components/agroverse/farmer-dashboard"
import { CropRecommendation } from "@/components/agroverse/crop-recommendation"
import { LiveInputs } from "@/components/agroverse/live-inputs"
import { WaterVisual } from "@/components/agroverse/water-visual"
import { IrrigationDecision } from "@/components/agroverse/irrigation-decision"
import { IntegratedFarming } from "@/components/agroverse/integrated-farming"
import { FertilizerAdvisor } from "@/components/agroverse/fertilizer-advisor"
import { ProfitEstimator } from "@/components/agroverse/profit-estimator"

export default function AgroVerse() {
  // Auth State
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Farm Setup Data
  const [farmData, setFarmData] = useState<FarmData | null>(null)

  // Live Farm States (Sensor Simulation)
  const [soil, setSoil] = useState(40)
  const [water, setWater] = useState(5)
  const [stage, setStage] = useState("Tillering")
  const [integrated, setIntegrated] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem("agroverse-logged-in")
    if (stored === "true") {
      setLoggedIn(true)
    }
    setIsLoaded(true)
  }, [])

  const handleLogin = () => {
    localStorage.setItem("agroverse-logged-in", "true")
    setLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("agroverse-logged-in")
    setLoggedIn(false)
    setFarmData(null)
  }

  // Wait for client-side hydration
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex items-center gap-3">
          <Leaf className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Loading AgroVerse...</span>
        </div>
      </div>
    )
  }

  // Login Screen
  if (!loggedIn) {
    return <Login onLogin={handleLogin} />
  }

  const steps = [
    { id: 1, label: "Farm Setup", icon: Settings, active: !farmData },
    { id: 2, label: "AI Analysis", icon: BarChart3, active: !!farmData },
    { id: 3, label: "Live Engine", icon: Gauge, active: !!farmData },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">AgroVerse</h1>
              <p className="text-xs text-muted-foreground">Smart Farm Intelligence</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${step.active ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />}
                </div>
              )
            })}
          </div>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!farmData ? (
          // Step 1: Farm Setup
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="mb-2">
                <Sprout className="w-3 h-3 mr-1" />
                Step 1 of 3
              </Badge>
              <h2 className="text-3xl font-bold text-balance">Tell Us About Your Farm</h2>
              <p className="text-muted-foreground text-balance">
                Provide your farm details for personalized AI-powered crop recommendations
              </p>
            </div>
            <FarmerDashboard onSubmit={setFarmData} />
          </div>
        ) : (
          // Step 2 & 3: Recommendations + Live Engine
          <div className="space-y-8">
            {/* Section Header: AI Recommendations */}
            <div className="space-y-2">
              <Badge variant="secondary">
                <BarChart3 className="w-3 h-3 mr-1" />
                AI Analysis
              </Badge>
              <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
              <p className="text-muted-foreground">
                Based on {farmData.land} acres of {farmData.soil} soil with {farmData.texture} texture
              </p>
            </div>

            {/* Crop Recommendation */}
            <CropRecommendation data={farmData} />

            {/* Section Header: Live Engine */}
            <div className="space-y-2 pt-4">
              <Badge variant="secondary">
                <Gauge className="w-3 h-3 mr-1" />
                Live Decision Engine
              </Badge>
              <h2 className="text-2xl font-bold">Real-Time Farm Management</h2>
              <p className="text-muted-foreground">
                Simulate sensor inputs and get instant irrigation, fertilizer, and profit decisions
              </p>
            </div>

            {/* Live Inputs */}
            <LiveInputs
              soil={soil}
              setSoil={setSoil}
              water={water}
              setWater={setWater}
              stage={stage}
              setStage={setStage}
              integrated={integrated}
              setIntegrated={setIntegrated}
            />

            {/* Water Visual */}
            <WaterVisual water={water} integrated={integrated} />

            {/* Decision Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <IrrigationDecision
                soil={soil}
                water={water}
                stage={stage}
                integrated={integrated}
              />
              <IntegratedFarming water={water} integrated={integrated} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <FertilizerAdvisor stage={stage} />
              <ProfitEstimator water={water} target={6} integrated={integrated} />
            </div>

            {/* Reset Button */}
            <div className="text-center pt-4">
              <Button variant="outline" onClick={() => setFarmData(null)} className="gap-2">
                <Settings className="w-4 h-4" />
                Modify Farm Setup
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>AgroVerse – Smart Farm Intelligence Platform</p>
          <p className="text-xs mt-1">Built for precision agriculture and sustainable farming</p>
        </div>
      </footer>
      <AIAssistant />
    </div>
  )
}
