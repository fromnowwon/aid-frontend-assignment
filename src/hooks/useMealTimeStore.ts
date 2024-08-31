import { create } from "zustand";
import { MealTime } from "@/types/MealTimeTypes";
import { fetchMealTimes, updateMealTime } from "@/services/api";

interface MealTimesState {
  mealTimes: {
    lunch: MealTime;
    dinner: MealTime;
  };
  fetchMealTimes: () => Promise<void>;
  updateMealTime: (
    mealType: string,
    startTime: string,
    endTime: string
  ) => Promise<void>;
}

export const useMealTimeStore = create<MealTimesState>((set) => ({
  mealTimes: {
    lunch: { startTime: "12:00", endTime: "13:00" },
    dinner: { startTime: "18:00", endTime: "19:00" },
  },
  fetchMealTimes: async () => {
    try {
      const data = await fetchMealTimes();
      set({ mealTimes: data });
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
  updateMealTime: async (
    mealType: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      await updateMealTime(mealType, { startTime, endTime });

      set((state) => ({
        mealTimes: {
          ...state.mealTimes,
          [mealType]: { startTime, endTime },
        },
      }));
    } catch (error) {
      console.error("meal-time 업데이트 오류:", error);
    }
  },
}));
