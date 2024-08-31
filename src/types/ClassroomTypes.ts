export interface Classroom {
  id: number;
  name: string;
  sessions: Session[];
}

export interface Session {
  sessionId: number;
  classroomId: number;
  timeOfDay: TimeOfDay;
  startTime: string;
  endTime: string;
}

export type TimeOfDay = "morning" | "afternoon" | "evening";
