import { useMealTimeStore } from "@/hooks/useMealTimeStore";
import MealTimeSession from "./MealTimeSession";
import { useEffect } from "react";

export default function MealTimePanel() {
  const { mealTimes, fetchMealTimes } = useMealTimeStore((state) => ({
    mealTimes: [
      { mealType: "lunch", time: state.mealTimes.lunchTime },
      { mealType: "dinner", time: state.mealTimes.dinnerTime },
    ],
    fetchMealTimes: state.fetchMealTimes,
  }));

  useEffect(() => {
    // 초기 데이터 로드
    const loadData = async () => {
      await fetchMealTimes();
    };

    loadData();
  }, [fetchMealTimes]);

  return (
    <div className="flex space-x-3">
      {mealTimes.map((meal) => (
        <MealTimeSession
          key={meal.mealType}
          mealType={meal.mealType}
          mealTime={meal.time}
        />
      ))}
    </div>
  );
}
