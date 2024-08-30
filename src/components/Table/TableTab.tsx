interface TableTabProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TableTab({ name, isActive, onClick }: TableTabProps) {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? "font-semibold" : "text-gray-600"}`}
    >
      {name}
    </button>
  );
}
