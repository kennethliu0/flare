"use client"

import { useRef, useEffect, useState } from "react"
import { useMapsLibrary } from "@vis.gl/react-google-maps"
import { cn } from "@/lib/utils"
import type { PlaceData } from "@/types/google-maps"

interface PlacesAutocompleteInputProps {
  id?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onPlaceSelect: (place: PlaceData | null) => void
  className?: string
}

export function PlacesAutocompleteInput({
  id,
  placeholder,
  value,
  onChange,
  onPlaceSelect,
  className,
}: PlacesAutocompleteInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const placesLibrary = useMapsLibrary("places")
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false)

  useEffect(() => {
    if (!placesLibrary || !inputRef.current || autocompleteRef.current) return

    autocompleteRef.current = new placesLibrary.Autocomplete(inputRef.current, {
      fields: ["place_id", "formatted_address", "geometry"],
    })

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace()

      if (place?.geometry?.location && place.place_id) {
        const placeData: PlaceData = {
          placeId: place.place_id,
          description: place.formatted_address || "",
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        onChange(placeData.description)
        onPlaceSelect(placeData)
      }
    })

    setIsLibraryLoaded(true)
  }, [placesLibrary, onChange, onPlaceSelect])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    onPlaceSelect(null)
  }

  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      placeholder={isLibraryLoaded ? placeholder : "Loading..."}
      value={value}
      onChange={handleInputChange}
      disabled={!isLibraryLoaded && !!placesLibrary}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    />
  )
}
