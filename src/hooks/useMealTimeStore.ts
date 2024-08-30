import { create } from "zustand";
import { MealTime } from "@/types/MealTimeTypes";
import { fetchMealTimes } from "@/services/api";

interface MealTimesState {
  mealTimes: {
    lunchTime: MealTime;
    dinnerTime: MealTime;
  };
  fetchMealTimes: () => Promise<void>;
}

export const useMealTimeStore = create<MealTimesState>((set) => ({
  mealTimes: {
    lunchTime: { startTime: "12:00", endTime: "13:00" },
    dinnerTime: { startTime: "18:00", endTime: "19:00" },
  },
  fetchMealTimes: async () => {
    try {
      const data = await fetchMealTimes();
      set({ mealTimes: data });
    } catch (error) {
      console.error("meal-times API 요청 오류:", error);
    }
  },
}));
