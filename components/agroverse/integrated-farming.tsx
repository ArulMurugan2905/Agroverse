"use client"

import { Fish, Bird, AlertTriangle, CheckCircle2, Sprout, Droplets } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface IntegratedFarmingProps {
  water: number
  integrated: boolean
}

export function IntegratedFarming({ water, integrated }: IntegratedFarmingProps) {
  if (!integrated) {
    return (
      <Card className="border border-dashed border-muted-foreground/30 bg-muted/30">
        <CardContent className="py-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
            <Fish className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Integrated Farming Disabled</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Enable integrated farming in the live inputs to get fish/duck rearing recommendations along with your crop cultivation.
          </p>
        </CardContent>
      </Card>
    )
  }

  const isWaterSafe = water >= 4
  const isWaterOptimal = water >= 5 && water <= 8

  const benefits = [
    { icon: Fish, label: "Natural Pest Control", desc: "Fish eat insects & larvae" },
    { icon: Bird, label: "Organic Fertilizer", desc: "Droppings enrich soil" },
    { icon: Sprout, label: "Weed Management", desc: "Ducks forage on weeds" },
    { icon: Droplets, label: "Water Aeration", desc: "Movement oxygenates water" },
  ]

  return (
    <Card className="border-0 shadow-xl shadow-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Fish className="w-6 h-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-xl">Integrated Farming</CardTitle>
              <p className="text-sm text-muted-foreground">Fish + Duck + Rice System</p>
            </div>
          </div>
          <Badge className={isWaterOptimal ? "bg-primary/10 text-primary" : isWaterSafe ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"}>
            {isWaterOptimal ? (
              <><CheckCircle2 className="w-3 h-3 mr-1" /> Optimal</>
            ) : isWaterSafe ? (
              <><AlertTriangle className="w-3 h-3 mr-1" /> Adequate</>
            ) : (
              <><AlertTriangle className="w-3 h-3 mr-1" /> Critical</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Water Status Alert */}
        {!isWaterSafe && (
          <div className="flex items-start gap-3 p-4 bg-destructive/5 border border-destructive/20 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Water Level Critical!</p>
              <p className="text-sm text-muted-foreground">
                Current water level ({water}cm) is too low for fish and duck survival. 
                Maintain minimum 4-5 cm for integrated farming.
              </p>
            </div>
          </div>
        )}

        {isWaterSafe && !isWaterOptimal && (
          <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-accent">Water Level Advisory</p>
              <p className="text-sm text-muted-foreground">
                Current level ({water}cm) is adequate but not optimal. 
                Target 5-8 cm for best integrated farming results.
              </p>
            </div>
          </div>
        )}

        {/* Benefits Grid */}
        <div>
          <p className="text-sm font-medium mb-3">Ecosystem Benefits</p>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.label} className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{benefit.label}</p>
                    <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-primary/5 rounded-xl">
          <p className="font-medium mb-2">Stocking Recommendations</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Fish: 1,500-2,000 fingerlings per acre</li>
            <li>• Ducks: 200-300 ducklings per acre</li>
            <li>• Best species: Catla, Rohu, Common Carp</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
