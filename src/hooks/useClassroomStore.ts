import { create } from "zustand";
import { fetchClassrooms, fetchSessions } from "@/services/api";
import { Classroom, Session } from "@/types/ClassroomTypes";

type ClassroomState = {
  classrooms: Classroom[];
  sessions: Session[];
  loadClassrooms: () => Promise<void>;
  loadSessions: () => Promise<void>;
};

export const useClassroomStore = create<ClassroomState>((set) => ({
  classrooms: [],
  sessions: [],
  loadClassrooms: async () => {
    try {
      const data = await fetchClassrooms();
      set({ classrooms: data });
    } catch (error) {
      console.error(error);
    }
  },
  loadSessions: async () => {
    try {
      const data = await fetchSessions();
      set({ sessions: data });
    } catch (error) {
      console.error(error);
    }
  },
}));
