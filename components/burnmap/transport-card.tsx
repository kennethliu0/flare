"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type BurnLevel = "high" | "moderate" | "low"

interface TransportCardProps {
  icon: LucideIcon
  label: string
  time: string
  distance: string
  calories: number
  burnLevel: BurnLevel
  isRecommended?: boolean
}

export function TransportCard({
  icon: Icon,
  label,
  time,
  distance,
  calories,
  burnLevel,
  isRecommended = false,
}: TransportCardProps) {
  const burnColors = {
    high: "bg-burn-high text-white",
    moderate: "bg-burn-moderate text-foreground",
    low: "bg-burn-low text-foreground",
  }

  const burnBorderColors = {
    high: "border-burn-high/20 hover:border-burn-high/40",
    moderate: "border-burn-moderate/20 hover:border-burn-moderate/40",
    low: "border-border hover:border-muted-foreground/30",
  }

  const iconBgColors = {
    high: "bg-burn-high/10 text-burn-high",
    moderate: "bg-burn-moderate/10 text-burn-moderate",
    low: "bg-muted text-muted-foreground",
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer",
        burnBorderColors[burnLevel],
        isRecommended && "ring-2 ring-primary ring-offset-2"
      )}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-none rounded-bl-lg bg-primary text-primary-foreground">
            Best Choice
          </Badge>
        </div>
      )}
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          {/* Icon Section */}
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
              iconBgColors[burnLevel]
            )}
          >
            <Icon className="h-7 w-7" />
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground">{label}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {distance}
              </span>
            </div>
          </div>

          {/* Calorie Badge */}
          <div className="shrink-0">
            <div
              className={cn(
                "flex flex-col items-center justify-center rounded-2xl px-4 py-3 min-w-[90px]",
                burnColors[burnLevel]
              )}
            >
              <span className="text-2xl font-bold leading-none">{calories}</span>
              <span className="text-xs opacity-90 mt-0.5">kcal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
