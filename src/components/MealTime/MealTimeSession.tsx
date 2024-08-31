import { MealTime } from "@/types/MealTimeTypes";

interface MealTimeSessionProps {
  mealTime: MealTime;
  mealType: string;
}

export default function MealTimeSession({
  mealTime,
  mealType,
}: MealTimeSessionProps) {
  return (
    <div className="flex items-center space-x-2">
      <h4 className="text-sm">{mealType === "lunch" ? "점심" : "저녁"}</h4>
      <div>
        {mealTime.startTime} - {mealTime.endTime}
      </div>
    </div>
  );
}
