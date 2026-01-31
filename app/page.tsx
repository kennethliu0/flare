"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/burnmap/header"
import { RouteInput } from "@/components/burnmap/route-input"
import { ResultsList } from "@/components/burnmap/results-list"
import { Leaf, TrendingUp, Heart } from "lucide-react"

export default function BurnMapPage() {
  const [userWeight, setUserWeight] = useState(70)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleCalculate = async () => {
    if (!origin || !destination) return

    setIsCalculating(true)
    
    // Simulate API call to get distance
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Generate a random distance between 0.5 and 15 km for demo
    const randomDistance = Math.random() * 14.5 + 0.5
    setCalculatedDistance(Math.round(randomDistance * 10) / 10)
    
    setIsCalculating(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userWeight={userWeight} onWeightChange={setUserWeight} />
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-balance">
            Plan Your Trip, Burn Calories
          </h2>
          <p className="text-muted-foreground text-balance">
            Compare transport options and see how many calories you can burn on your journey
          </p>
        </div>

        {/* Route Input */}
        <div className="mb-8">
          <RouteInput
            origin={origin}
            destination={destination}
            onOriginChange={setOrigin}
            onDestinationChange={setDestination}
            onCalculate={handleCalculate}
            isCalculating={isCalculating}
          />
        </div>

        {/* Results */}
        {calculatedDistance !== null && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultsList distance={calculatedDistance} userWeight={userWeight} />
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <InfoCard
                icon={Leaf}
                title="Eco-Friendly"
                description="Walking & biking produce zero emissions"
                color="primary"
              />
              <InfoCard
                icon={TrendingUp}
                title="Stay Active"
                description="Track calories burned on every trip"
                color="accent"
              />
              <InfoCard
                icon={Heart}
                title="Health First"
                description="Make healthier transportation choices"
                color="muted"
              />
            </div>
          </div>
        )}

        {/* Empty State */}
        {calculatedDistance === null && (
          <div className="text-center py-12">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Ready to start?
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-balance">
              Enter your origin and destination above to see calorie burn comparisons for different transport options
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Calorie estimates based on MET values. Actual calories may vary.
          </p>
        </div>
      </footer>
    </div>
  )
}

interface InfoCardProps {
  icon: React.ElementType
  title: string
  description: string
  color: "primary" | "accent" | "muted"
}

function InfoCard({ icon: Icon, title, description, color }: InfoCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/20 text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
  }

  return (
    <div className="rounded-xl bg-card p-4 border border-border">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color]} mb-3`}>
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="font-medium text-foreground mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
