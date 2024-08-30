export interface Classroom {
  id: number;
  name: string;
}

export interface Session {
  id: number;
  classroomId: number;
  timeOfDay: "morning" | "afternoon" | "evening";
  startTime: string;
  endTime: string;
}
