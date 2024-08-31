interface TimetableViewerTabProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TimetableViewerTab({
  name,
  isActive,
  onClick,
}: TimetableViewerTabProps) {
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
