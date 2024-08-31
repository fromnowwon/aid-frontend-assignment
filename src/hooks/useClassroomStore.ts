import { create } from "zustand";
import {
  addSession,
  applySessionsToAll,
  fetchClassrooms,
  removeSession,
  updateSession,
} from "@/services/api";
import { Classroom, Session } from "@/types/ClassroomTypes";

type ClassroomState = {
  classrooms: Classroom[];
  activeClassroomId: number | null;
  getClassrooms: () => Promise<void>;
  getClassroomSessions: (classroomId: number) => Promise<Session[]>;
  setActiveClassroomId: (id: number) => void;
  addSession: (
    classroomId: number,
    timeOfDay: string,
    startTime: string,
    endTime: string,
    sessionId: number
  ) => Promise<void>;
  removeSession: (classroomId: number, sessionId: number) => Promise<void>;
  updateSessionTime: (
    classroomId: number,
    sessionId: number,
    startTime: string,
    endTime: string
  ) => Promise<void>;
  applySessionsToAllClassrooms: (sessions: Session[]) => Promise<void>;
};

export const useClassroomStore = create<ClassroomState>((set, get) => ({
  classrooms: [],
  activeClassroomId: null,
  getClassrooms: async () => {
    try {
      const data = await fetchClassrooms();
      set({ classrooms: data });
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
  setActiveClassroomId: (id) => set({ activeClassroomId: id }),
  getClassroomSessions: async (classroomId) => {
    // 현재 교실의 모든 세션 가져오기
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
      const data = await addSession(
        classroomId,
        timeOfDay,
        startTime,
        endTime,
        sessionId
      );

      set((state) => ({
        classrooms: state.classrooms.map((classroom) =>
          classroom.id === classroomId
            ? {
                ...classroom,
                sessions: [...classroom.sessions, data],
              }
            : classroom
        ),
      }));
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
  updateSessionTime: async (
    classroomId: number,
    sessionId: number,
    startTime: string,
    endTime: string
  ) => {
    try {
      await updateSession(classroomId, sessionId, startTime, endTime);

      set((state) => ({
        classrooms: state.classrooms.map((classroom) =>
          classroom.id === classroomId
            ? {
                ...classroom,
                sessions: classroom.sessions.map((session) =>
                  session.sessionId === sessionId
                    ? { ...session, startTime, endTime }
                    : session
                ),
              }
            : classroom
        ),
      }));
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
  applySessionsToAllClassrooms: async (sessions: Session[]) => {
    const { classrooms } = get();

    try {
      // 클라이언트 상태 업데이트
      const updatedClassrooms = classrooms.map((classroom) => ({
        ...classroom,
        sessions: [...sessions],
      }));

      set({ classrooms: updatedClassrooms });

      // 서버에 변경 사항 전송
      await applySessionsToAll(sessions);
    } catch (error) {
      console.error("API 요청 오류:", error);
    }
  },
}));
