"use client"

import React from "react"

import { MapPin, Navigation, Route, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlacesAutocompleteInput } from "@/components/ui/places-autocomplete-input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { PlaceData } from "@/types/google-maps"

interface RouteInputProps {
  origin: string
  destination: string
  onOriginChange: (value: string) => void
  onDestinationChange: (value: string) => void
  onOriginPlaceSelect: (place: PlaceData | null) => void
  onDestinationPlaceSelect: (place: PlaceData | null) => void
  onCalculate: () => void
  isCalculating: boolean
  canCalculate: boolean
}

export function RouteInput({
  origin,
  destination,
  onOriginChange,
  onDestinationChange,
  onOriginPlaceSelect,
  onDestinationPlaceSelect,
  onCalculate,
  isCalculating,
  canCalculate,
}: RouteInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate()
  }

  return (
    <Card className="border-0 shadow-lg bg-card">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin" className="flex items-center gap-2 text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Origin
              </Label>
              <PlacesAutocompleteInput
                id="origin"
                placeholder="Enter starting point"
                value={origin}
                onChange={onOriginChange}
                onPlaceSelect={onOriginPlaceSelect}
                className="h-12 bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center gap-2 text-foreground">
                <Navigation className="h-4 w-4 text-accent" />
                Destination
              </Label>
              <PlacesAutocompleteInput
                id="destination"
                placeholder="Enter destination"
                value={destination}
                onChange={onDestinationChange}
                onPlaceSelect={onDestinationPlaceSelect}
                className="h-12 bg-background"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold gap-2"
            disabled={!canCalculate || isCalculating}
          >
            {isCalculating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Route className="h-5 w-5" />
                Calculate Route
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
