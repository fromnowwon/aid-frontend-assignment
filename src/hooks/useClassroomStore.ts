import { create } from "zustand";
import { addSession, fetchClassrooms, removeSession } from "@/services/api";
import { Classroom, Session } from "@/types/ClassroomTypes";

type ClassroomState = {
  classrooms: Classroom[];
  fetchClassrooms: () => Promise<void>;
  getClassroomSessions: (classroomId: number) => Promise<Session[]>;
  addSession: (
    classroomId: number,
    timeOfDay: string,
    startTime: string,
    endTime: string,
    sessionId: number
  ) => Promise<void>;
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
  // 현재 classroom의 모든 세션 가져오기
  getClassroomSessions: async (classroomId) => {
    const state: ClassroomState = useClassroomStore.getState(); // 상태를 직접 가져오기
    const classroom = state.classrooms.find((c) => c.id === classroomId);
    return classroom ? classroom.sessions : [];
  },
  addSession: async (
    classroomId: number,
    timeOfDay: string,
    startTime: string,
    endTime: string,
    sessionId: number
  ) => {
    try {
      await addSession(classroomId, timeOfDay, startTime, endTime, sessionId);
      await fetchClassrooms();
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
