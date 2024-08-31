import { create } from "zustand";
import { fetchClassrooms, removeSession } from "@/services/api";
import { Classroom } from "@/types/ClassroomTypes";

type ClassroomState = {
  classrooms: Classroom[];
  fetchClassrooms: () => Promise<void>;
  removeSession: (classroomId: number, sessionId: number) => Promise<void>;
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
  removeSession: async (classroomId: number, sessionId: number) => {
    try {
      await removeSession(classroomId, sessionId);
      set((state) => ({
        classrooms: state.classrooms.map((classroom) =>
          classroom.id === classroomId
            ? {
                ...classroom,
                sessions: classroom.sessions.filter(
                  (session) => session.sessionId !== sessionId
                ),
              }
            : classroom
        ),
      }));
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
}));
