"use client"

import { IndianRupee, TrendingUp, TrendingDown, Fish, Wheat, Calculator, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfitEstimatorProps {
  water: number
  target: number
  integrated: boolean
}

export function ProfitEstimator({ water, target, integrated }: ProfitEstimatorProps) {
  // Base profit calculation (simplified model)
  const baseYield = 25 // quintals per acre
  const pricePerQuintal = 2200 // INR
  const baseCropRevenue = baseYield * pricePerQuintal

  // Water efficiency factor
  const waterEfficiency = water >= 4 && water <= 8 ? 1 : water < 4 ? 0.7 : 0.85
  const adjustedCropRevenue = Math.round(baseCropRevenue * waterEfficiency)

  // Integrated farming bonus
  const fishRevenue = integrated && water >= 4 ? 15000 : 0
  const duckRevenue = integrated && water >= 4 ? 8000 : 0
  const integratedTotal = fishRevenue + duckRevenue

  // Costs
  const cropCosts = 25000
  const integratedCosts = integrated ? 8000 : 0
  const totalCosts = cropCosts + integratedCosts

  // Final calculations
  const totalRevenue = adjustedCropRevenue + integratedTotal
  const netProfit = totalRevenue - totalCosts
  const profitMargin = Math.round((netProfit / totalRevenue) * 100)
  const isProfitable = netProfit > 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="border-0 shadow-xl shadow-primary/5 overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Profit Estimator</CardTitle>
              <p className="text-sm text-muted-foreground">Per acre revenue projection</p>
            </div>
          </div>
          <Badge className={isProfitable ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}>
            {isProfitable ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {profitMargin}% Margin
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Revenue Breakdown */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Revenue Breakdown</p>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wheat className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium">Crop Revenue</p>
                <p className="text-xs text-muted-foreground">{baseYield}q × ₹{pricePerQuintal}/q × {Math.round(waterEfficiency * 100)}% efficiency</p>
              </div>
            </div>
            <span className="font-bold text-lg">{formatCurrency(adjustedCropRevenue)}</span>
          </div>

          {integrated && (
            <>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Fish className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Fish Revenue</p>
                    <p className="text-xs text-muted-foreground">{water >= 4 ? "Active" : "Insufficient water"}</p>
                  </div>
                </div>
                <span className="font-bold text-lg">{formatCurrency(fishRevenue)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🦆</span>
                  <div>
                    <p className="font-medium">Duck Revenue</p>
                    <p className="text-xs text-muted-foreground">{water >= 4 ? "Active" : "Insufficient water"}</p>
                  </div>
                </div>
                <span className="font-bold text-lg">{formatCurrency(duckRevenue)}</span>
              </div>
            </>
          )}
        </div>

        {/* Costs */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Estimated Costs</p>
          <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
            <p className="text-muted-foreground">
              Crop Production {integrated && "+ Integrated Farming"}
            </p>
            <span className="font-bold text-destructive">-{formatCurrency(totalCosts)}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Total Revenue</p>
            <span className="font-semibold">{formatCurrency(totalRevenue)}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Total Costs</p>
            <span className="font-semibold">-{formatCurrency(totalCosts)}</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl -mx-2">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-primary" />
              <span className="font-semibold">Net Profit</span>
            </div>
            <span className={`text-2xl font-bold ${isProfitable ? "text-primary" : "text-destructive"}`}>
              {formatCurrency(netProfit)}
            </span>
          </div>
        </div>

        {/* Tip */}
        {!integrated && (
          <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
            <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Enable integrated farming to potentially add ₹23,000+ per acre to your revenue!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
