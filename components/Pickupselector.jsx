"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

const PickupSelector = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Generate time slots from 10 AM to 9 PM
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 10;
    return `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
  });

  const handleConfirm = () => {
    if (!date || !time) {
      toast({
        variant: "destructive",
        title: "Please select both date and time",
        description: "A pickup date and time are required"
      });
      return;
    }

    toast({
      title: "Pickup time confirmed",
      description: `Your order will be ready for pickup on ${date.toLocaleDateString()} at ${time}`
    });

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Select Pickup Time
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Pickup Date & Time</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            className="border rounded-md"
          />
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleConfirm} className="w-full">
            Confirm Pickup Time
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PickupSelector;