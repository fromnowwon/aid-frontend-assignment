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
    <div>
      <h4>{mealType}</h4>
      <div>
        {mealTime.startTime} - {mealTime.endTime}
      </div>
    </div>
  );
}
