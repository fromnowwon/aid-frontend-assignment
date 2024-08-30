import { useMealTimeStore } from "@/hooks/useMealTimeStore";
import MealTimeSession from "./MealTimeSession";

const mealTimes = ["점심", "저녁"];

export default function MealTimePanel() {
  const lunchTime = useMealTimeStore((state) => state.lunchTime);
  const dinnerTime = useMealTimeStore((state) => state.dinnerTime);

  return (
    <div className="flex space-x-3">
      {mealTimes.map((mealTime) => (
        <MealTimeSession
          key={mealTime}
          mealTime={mealTime}
          lunchTime={lunchTime}
          dinnerTime={dinnerTime}
        />
      ))}
    </div>
  );
}
