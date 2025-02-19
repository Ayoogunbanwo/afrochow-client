"use client"

import React, { useState, useMemo } from "react"
import { format, isBefore, startOfDay, addDays, isWeekend } from "date-fns"
import { Clock } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

function PickupSelector({ onScheduled }) {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const timeSlots = useMemo(() => {
    if (!date) return []

    const slots = []
    const now = new Date()
    const isToday = startOfDay(date).getTime() === startOfDay(now).getTime()
    const currentHour = now.getHours()
    
    const startHour = isWeekend(date) ? 10 : 9
    const endHour = isWeekend(date) ? 16 : 18

    for (let hour = startHour; hour < endHour; hour++) {
      if (isToday && hour <= currentHour) continue

      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }
    return slots
  }, [date])

  function handleConfirm() {
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Incomplete Selection",
        description: "Please select both a pickup date and time."
      })
      return
    }

    const formattedDate = format(date, "MMMM d, yyyy")
    toast({
      title: "Pickup Scheduled",
      description: `Your pickup is set for ${formattedDate} at ${time}.`
    })

    onScheduled?.(formattedDate, time)
    setIsOpen(false)
  }

  function isDateDisabled(date) {
    return isBefore(startOfDay(date), startOfDay(new Date())) || 
           isBefore(addDays(new Date(), 14), startOfDay(date))
  }

  const buttonText = date && time
    ? `Pickup on ${format(date, "MMM d")} at ${time}`
    : "Select Pickup Time"

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Pickup Time</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={isDateDisabled}
              initialFocus
              className="rounded-md border"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Select
              value={time}
              onValueChange={setTime}
              disabled={!date}
            >
              <SelectTrigger>
                <SelectValue placeholder={date ? "Select time" : "Choose a date first"} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.length > 0 ? (
                  timeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-slots">
                    No available time slots
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleConfirm}
            disabled={!date || !time}
            className="w-full mt-2"
          >
            Confirm Pickup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PickupSelector