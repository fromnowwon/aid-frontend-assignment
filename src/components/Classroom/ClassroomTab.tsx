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
      className={`p-3 font-semibold ${
        isActive ? " text-main" : "text-gray-600"
      }`}
    >
      {name}
    </button>
  );
}
