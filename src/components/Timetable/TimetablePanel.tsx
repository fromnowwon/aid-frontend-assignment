import { useClassroomStore } from "@/hooks/useClassroomStore";
import TimetableSession from "./TimetableSession";

interface TimetablePanelProps {
  activeTab: number;
}

export default function TimetablePanel({ activeTab }: TimetablePanelProps) {
  const classrooms = useClassroomStore((state) => state.classrooms);
  const classroom = classrooms.find((classroom) => classroom.id === activeTab);

  return (
    <div className="rounded-md border">
      <TimetableSession sessions={classroom?.sessions || []} />
    </div>
  );
}
