import { useClassroomStore } from "@/hooks/useClassroomStore";
import TableSession from "./TableSession";

interface TablePanelProps {
  activeTab: number;
}

export default function TablePanel({ activeTab }: TablePanelProps) {
  const classrooms = useClassroomStore((state) => state.classrooms);
  const classroom = classrooms.find((classroom) => classroom.id === activeTab);

  return (
    <div className="rounded-md border">
      <TableSession sessions={classroom?.sessions || []} />
    </div>
  );
}
