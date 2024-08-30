import TimePicker from "react-time-picker";

interface TimePickerProps {
  time: string;
  onChange: (time: string | null) => void;
}

export default function TimePickerComponent({
  time,
  onChange,
}: TimePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <TimePicker
        onChange={onChange}
        value={time}
        format="HH:mm"
        disableClock
      />
    </div>
  );
}
