import ScheduleSession from "./ScheduleSession";
import { useClassroomStore } from "@/store/useClassroomStore";

interface SchedulePanelProps {
  activeTab: number;
}

const timeOfDays = ["morning", "afternoon", "evening"];

export default function SchedulePanel({ activeTab }: SchedulePanelProps) {
  const classrooms = useClassroomStore((state) => state.classrooms);
  const classroom = classrooms.find((classroom) => classroom.id === activeTab);

  return (
    <div className="flex space-x-3">
      {classroom ? (
        timeOfDays.map((timeOfDay) => {
          const sessions = classroom?.sessions.filter(
            (session) => session.timeOfDay === timeOfDay
          );

          return (
            <ScheduleSession
              key={timeOfDay}
              classroomId={classroom.id}
              timeOfDay={timeOfDay}
              sessions={sessions || []}
            />
          );
        })
      ) : (
        <div>해당 교실 없음</div>
      )}
    </div>
  );
}
