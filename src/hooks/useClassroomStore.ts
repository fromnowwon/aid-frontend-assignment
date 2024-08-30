import { create } from "zustand";
import { fetchClassrooms } from "@/services/api";
import { Classroom } from "@/types/ClassroomTypes";

type ClassroomState = {
  classrooms: Classroom[];
  fetchClassrooms: () => Promise<void>;
};

export const useClassroomStore = create<ClassroomState>((set) => ({
  classrooms: [],
  fetchClassrooms: async () => {
    try {
      const data = await fetchClassrooms();
      set({ classrooms: data });
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
}));
