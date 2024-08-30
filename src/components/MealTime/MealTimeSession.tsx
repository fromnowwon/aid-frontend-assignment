import { MealTime } from "@/types/MealTimeTypes";

interface MealTimeSessionProps {
  mealTime: string;
  lunchTime: MealTime;
  dinnerTime: MealTime;
}

export default function MealTimeSession({
  mealTime,
  lunchTime,
  dinnerTime,
}: MealTimeSessionProps) {
  return (
    <div>
      <h4>{mealTime}</h4>
      <div>
        {lunchTime.startTime} - {dinnerTime.endTime}
      </div>
    </div>
  );
}
