import { Session } from "@/types/ClassroomTypes";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScheduleSessionProps {
  timeOfDay: string;
  sessions: Session[];
}

export default function ScheduleSession({
  timeOfDay,
  sessions,
}: ScheduleSessionProps) {
  return (
    <div>
      <h3>{timeOfDay}</h3>
      <div>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.sessionId} className="flex space-x-2">
              <h4>{session.sessionId}교시</h4>
              <div>
                {session.startTime} - {session.endTime}
              </div>
              <Button variant="outline">
                <Trash2 />
              </Button>
            </div>
          ))
        ) : (
          <p>수업 없음</p>
        )}
      </div>
      <Button>+ {timeOfDay} 교시 추가</Button>
    </div>
  );
}
