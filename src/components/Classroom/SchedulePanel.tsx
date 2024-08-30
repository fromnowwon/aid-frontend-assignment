import ScheduleSession from "./ScheduleSession";
import { useClassroomStore } from "@/hooks/useClassroomStore";

interface SchedulePanelProps {
  activeTab: number;
}

const timeOfDays = ["morning", "afternoon", "evening"];

export default function SchedulePanel({ activeTab }: SchedulePanelProps) {
  const classrooms = useClassroomStore((state) => state.classrooms);
  const classroom = classrooms.find((classroom) => classroom.id === activeTab);

  return (
    <div className="flex space-x-3">
      {timeOfDays.map((timeOfDay) => {
        const sessions = classroom?.sessions.filter(
          (session) => session.timeOfDay === timeOfDay
        );

        return (
          <ScheduleSession
            key={timeOfDay}
            timeOfDay={timeOfDay}
            sessions={sessions || []}
          />
        );
      })}
    </div>
  );
}
