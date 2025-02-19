import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StoreHours = ({ data, updateData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [allDaysTime, setAllDaysTime] = useState({ openingTime: "", closingTime: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(data);
    setIsEditing(false);
  };

  const handleSetAllDays = () => {
    const updatedFormData = { ...formData };
    DAYS_OF_WEEK.forEach((day) => {
      updatedFormData[day.toLowerCase()] = {
        openingTime: allDaysTime.openingTime,
        closingTime: allDaysTime.closingTime,
      };
    });
    setFormData(updatedFormData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="border-b bg-orange-50">
        <CardTitle className="text-xl sm:text-2xl font-bold text-orange-700">Store Hours</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {!isEditing ? (
          <div>
            <div className="grid gap-4 text-gray-700">
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="flex justify-between border-b py-2">
                  <span className="font-medium">{day}</span>
                  <span>
                    {formData[day.toLowerCase()]?.openingTime || "Closed"} - {formData[day.toLowerCase()]?.closingTime || "Closed"}
                  </span>
                </div>
              ))}
            </div>
            <Button onClick={() => setIsEditing(true)} variant="outline" className="mt-4 text-orange-600 border-orange-600">
              Edit Hours
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 px-4 sm:px-0">
            <div className="bg-orange-50 p-4 rounded-lg">
              <Label className="text-lg font-medium text-gray-700">Set Hours for All Days</Label>
              <div className="grid gap-4 sm:grid-cols-2 mt-2">
                <div>
                  <Label htmlFor="all-days-opening-time">Opening Time</Label>
                  <Input
                    id="all-days-opening-time"
                    type="time"
                    value={allDaysTime.openingTime}
                    onChange={(e) => setAllDaysTime({ ...allDaysTime, openingTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="all-days-closing-time">Closing Time</Label>
                  <Input
                    id="all-days-closing-time"
                    type="time"
                    value={allDaysTime.closingTime}
                    onChange={(e) => setAllDaysTime({ ...allDaysTime, closingTime: e.target.value })}
                  />
                </div>
              </div>
              <Button type="button" onClick={handleSetAllDays} className="mt-4 bg-orange-500 text-white">
                Apply to All Days
              </Button>
            </div>
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`${day.toLowerCase()}-openingTime`}>{day} Opening Time</Label>
                  <Input
                    id={`${day.toLowerCase()}-openingTime`}
                    name={`${day.toLowerCase()}-openingTime`}
                    type="time"
                    value={formData[day.toLowerCase()]?.openingTime || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [day.toLowerCase()]: {
                          ...formData[day.toLowerCase()],
                          openingTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`${day.toLowerCase()}-closingTime`}>{day} Closing Time</Label>
                  <Input
                    id={`${day.toLowerCase()}-closingTime`}
                    name={`${day.toLowerCase()}-closingTime`}
                    type="time"
                    value={formData[day.toLowerCase()]?.closingTime || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [day.toLowerCase()]: {
                          ...formData[day.toLowerCase()],
                          closingTime: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" className="flex-1 bg-orange-500 text-white">
                <Check className="w-4 h-4 mr-2" /> Save Hours
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 border-orange-500 text-orange-500">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default StoreHours;
