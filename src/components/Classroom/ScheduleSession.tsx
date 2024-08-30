import { Session } from "@/types/ClassroomTypes";

interface ScheduleSessionProps {
  timeOfDay: "morning" | "afternoon" | "evening";
  sessions: Session[];
}

export default function ScheduleSession({
  timeOfDay,
  sessions,
}: ScheduleSessionProps) {
  return (
    <div>
      <h3>{timeOfDay}</h3>
      <ul>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <li key={session.id}>
              {session.startTime} - {session.endTime}
            </li>
          ))
        ) : (
          <li>수업 없음</li>
        )}
      </ul>
    </div>
  );
}
