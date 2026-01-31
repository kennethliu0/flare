"use client"

import { useState, useCallback } from "react"
import { useMapsLibrary } from "@vis.gl/react-google-maps"
import type { PlaceData } from "@/types/google-maps"

interface DistanceResult {
  distanceKm: number
  durationMinutes: number
}

export function useDistanceMatrix() {
  const routesLibrary = useMapsLibrary("routes")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateDistance = useCallback(
    async (origin: PlaceData, destination: PlaceData): Promise<DistanceResult | null> => {
      if (!routesLibrary) {
        setError("Google Maps routes library not loaded")
        return null
      }

      setIsLoading(true)
      setError(null)

      try {
        const service = new routesLibrary.DistanceMatrixService()

        const response = await service.getDistanceMatrix({
          origins: [{ lat: origin.lat, lng: origin.lng }],
          destinations: [{ lat: destination.lat, lng: destination.lng }],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        })

        if (response.rows[0]?.elements[0]?.status === "OK") {
          const element = response.rows[0].elements[0]
          const distanceKm = element.distance.value / 1000
          const durationMinutes = element.duration.value / 60

          return {
            distanceKm: Math.round(distanceKm * 10) / 10,
            durationMinutes: Math.round(durationMinutes),
          }
        } else {
          setError("Could not calculate distance between these locations")
          return null
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to calculate distance")
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [routesLibrary]
  )

  return {
    calculateDistance,
    isLoading,
    error,
    isReady: !!routesLibrary,
  }
}
