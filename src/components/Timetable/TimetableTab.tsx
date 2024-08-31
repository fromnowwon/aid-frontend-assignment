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
      className={`p-3 font-semibold ${
        isActive ? " text-main" : "text-gray-600"
      }`}
    >
      {name}
    </button>
  );
}
