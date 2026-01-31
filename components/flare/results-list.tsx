"use client"

import { TransportCard } from "./transport-card"
import type { BurnLevel } from "./transport-card"
import { Footprints, Bike, Bus, Car } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface TransportOption {
  id: string
  icon: LucideIcon
  label: string
  baseSpeed: number // km/h
  caloriesPerKmPerKg: number
  burnLevel: BurnLevel
}

const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    id: "walking",
    icon: Footprints,
    label: "Walking",
    baseSpeed: 5,
    caloriesPerKmPerKg: 0.75,
    burnLevel: "high",
  },
  {
    id: "biking",
    icon: Bike,
    label: "Biking",
    baseSpeed: 18,
    caloriesPerKmPerKg: 0.45,
    burnLevel: "high",
  },
  {
    id: "transit",
    icon: Bus,
    label: "Public Transit",
    baseSpeed: 25,
    caloriesPerKmPerKg: 0.05,
    burnLevel: "moderate",
  },
  {
    id: "driving",
    icon: Car,
    label: "Driving",
    baseSpeed: 40,
    caloriesPerKmPerKg: 0.02,
    burnLevel: "low",
  },
]

interface ResultsListProps {
  distance: number // in km
  userWeight: number // in kg
}

function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)} mins`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMins = Math.round(minutes % 60)
  if (remainingMins === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`
  }
  return `${hours} hr ${remainingMins} min`
}

function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`
  }
  return `${km.toFixed(1)} km`
}

export function ResultsList({ distance, userWeight }: ResultsListProps) {
  const results = TRANSPORT_OPTIONS.map((option) => {
    const timeInHours = distance / option.baseSpeed
    const timeInMinutes = timeInHours * 60
    const calories = Math.round(distance * option.caloriesPerKmPerKg * userWeight)

    return {
      ...option,
      time: formatTime(timeInMinutes),
      distance: formatDistance(distance),
      calories,
    }
  })

  // Find the highest calorie burning option that's practical (walking/biking under 1 hour)
  const recommendedId = results.find((r) => {
    const timeInMinutes = distance / (TRANSPORT_OPTIONS.find(o => o.id === r.id)!.baseSpeed) * 60
    return r.burnLevel === "high" && timeInMinutes < 60
  })?.id || "transit"

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Transport Options</h2>
        <span className="text-sm text-muted-foreground">
          {formatDistance(distance)} route
        </span>
      </div>
      <div className="space-y-3">
        {results.map((result) => (
          <TransportCard
            key={result.id}
            icon={result.icon}
            label={result.label}
            time={result.time}
            distance={result.distance}
            calories={result.calories}
            burnLevel={result.burnLevel}
            isRecommended={result.id === recommendedId}
          />
        ))}
      </div>
    </div>
  )
}
