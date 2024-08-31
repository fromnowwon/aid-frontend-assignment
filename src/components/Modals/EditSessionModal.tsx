import { useState } from "react";
import Modal from "../layout/Modal";
import DatePicker from "react-datepicker";
import { useClassroomStore } from "@/hooks/useClassroomStore";

interface EditSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroomId: number;
  sessionId: number;
  prevSessionEndTime: string;
  nextSessionStartTime: string;
  earliestSessionTime: string;
}

export default function EditSessionModal({
  isOpen,
  onClose,
  classroomId,
  sessionId,
  prevSessionEndTime,
  nextSessionStartTime,
  earliestSessionTime,
}: EditSessionModalProps) {
  const { updateSessionTime } = useClassroomStore();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleSave = async () => {
    try {
      const formattedStartTime =
        typeof startTime === "string" ? startTime : String(startTime);
      const formattedEndTime =
        typeof endTime === "string" ? endTime : String(endTime);

      if (formattedStartTime && formattedEndTime) {
        await updateSessionTime(
          classroomId,
          sessionId,
          formattedStartTime,
          formattedEndTime
        );
      }
      onClose();
    } catch (error) {
      console.error("교시 수정 오류:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="교시 수정"
      description={`${sessionId}교시의 시간을 수정할 수 있습니다.\n다른 교시의 시간이나 식사 시간과 중복될 수 없습니다.`}
      footerButtons={[
        {
          label: "취소",
          onClick: onClose,
          variant: "outline",
        },
        {
          label: "수정",
          onClick: handleSave,
          variant: "destructive",
        },
      ]}
    >
      <div className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            시작 시간
          </label>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="HH:mm"
            timeCaption="Time"
            autoFocus={false}
            minTime={new Date(`2024-01-01T${prevSessionEndTime}`)}
            maxTime={new Date(`2024-01-01T${nextSessionStartTime}`)}
            className="border border-gray-300 rounded-md p-2 w-20 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            종료 시간
          </label>
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={1}
            dateFormat="HH:mm"
            timeCaption="Time"
            autoFocus={false}
            minTime={startTime || new Date(`2024-01-01T${earliestSessionTime}`)}
            maxTime={new Date(`2024-01-01T${nextSessionStartTime}`)}
            className="border border-gray-300 rounded-md p-2 w-20 text-sm"
          />
        </div>
      </div>
    </Modal>
  );
}
