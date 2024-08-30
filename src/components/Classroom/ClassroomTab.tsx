interface ClassroomTabProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ClassroomTab({
  name,
  isActive,
  onClick,
}: ClassroomTabProps) {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? "font-semibold" : "text-gray-600"}`}
    >
      {name}
    </button>
  );
}
