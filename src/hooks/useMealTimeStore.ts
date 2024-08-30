import { create } from "zustand";
import { MealTime } from "@/types/MealTimeTypes";

interface MealTimesState {
  lunchTime: MealTime;
  dinnerTime: MealTime;
}

export const useMealTimeStore = create<MealTimesState>((set) => ({
  lunchTime: { startTime: "12:00", endTime: "13:00" },
  dinnerTime: { startTime: "18:00", endTime: "19:00" },
}));
