interface TimetableTabProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TimetableTab({
  name,
  isActive,
  onClick,
}: TimetableTabProps) {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? "font-semibold" : "text-gray-600"}`}
    >
      {name}
    </button>
  );
}
