"use client"

import { Flame, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface HeaderProps {
  userWeight: number
  onWeightChange: (weight: number) => void
}

export function Header({ userWeight, onWeightChange }: HeaderProps) {
  const [tempWeight, setTempWeight] = useState(userWeight.toString())
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    const weight = parseFloat(tempWeight)
    if (weight > 0 && weight < 500) {
      onWeightChange(weight)
      setIsOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Flame className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">BurnMap</h1>
            <p className="text-xs text-muted-foreground">Eco-friendly trip planning</p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>User Settings</DialogTitle>
              <DialogDescription>
                Set your weight for accurate calorie calculations
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="weight">Body Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={tempWeight}
                  onChange={(e) => setTempWeight(e.target.value)}
                  min="30"
                  max="300"
                  placeholder="Enter your weight"
                />
                <p className="text-sm text-muted-foreground">
                  Current: {userWeight} kg
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
