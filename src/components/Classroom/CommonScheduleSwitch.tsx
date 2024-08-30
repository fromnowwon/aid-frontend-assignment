import { Switch } from "../ui/switch";

export default function CommonScheduleSwitch() {
  return (
    <div className="flex space-x-3">
      <Switch />
      <p>모든 교실 동일 시간표 적용</p>
    </div>
  );
}
