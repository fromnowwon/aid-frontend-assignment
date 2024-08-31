import { useClassroomStore } from "@/store/useClassroomStore";
import TimetableViewerSession from "./TimetableViewerSession";

interface TimetableViewerSessionProps {
  activeTab: number;
}

export default function TimetableViewerPanel({
  activeTab,
}: TimetableViewerSessionProps) {
  const classrooms = useClassroomStore((state) => state.classrooms);
  const classroom = classrooms.find((classroom) => classroom.id === activeTab);

  return (
    <div className="rounded-md border">
      <TimetableViewerSession sessions={classroom?.sessions || []} />
    </div>
  );
}
