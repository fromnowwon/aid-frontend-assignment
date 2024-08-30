export interface Classroom {
  id: number;
  name: string;
  sessions: Session[];
}

export interface Session {
  sessionId: number;
  classroomId: number;
  timeOfDay: "morning" | "afternoon" | "evening";
  startTime: string;
  endTime: string;
}
