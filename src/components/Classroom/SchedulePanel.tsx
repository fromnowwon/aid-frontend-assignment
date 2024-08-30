import ScheduleSession from "./ScheduleSession";
import { useClassroomStore } from "@/hooks/useClassroomStore";

interface SchedulePanelProps {
  activeTab: number;
}

export default function SchedulePanel({ activeTab }: SchedulePanelProps) {
  const sessions = useClassroomStore((state) => state.sessions);
  const filteredSessions = sessions.filter(
    (session) => session.classroomId === activeTab
  );

  const morningSessions = filteredSessions.filter(
    (session) => session.timeOfDay === "morning"
  );
  const afternoonSessions = filteredSessions.filter(
    (session) => session.timeOfDay === "afternoon"
  );
  const eveningSessions = filteredSessions.filter(
    (session) => session.timeOfDay === "evening"
  );

  return (
    <div>
      <ScheduleSession timeOfDay="morning" sessions={morningSessions} />
      <ScheduleSession timeOfDay="afternoon" sessions={afternoonSessions} />
      <ScheduleSession timeOfDay="evening" sessions={eveningSessions} />
    </div>
  );
}
