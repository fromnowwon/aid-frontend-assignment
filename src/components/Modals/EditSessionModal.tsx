import { useEffect, useState } from "react";
import Modal from "../layout/Modal";
import DatePicker from "react-datepicker";
import { useClassroomStore } from "@/hooks/useClassroomStore";
import { validateTimes } from "@/lib/utils";

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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

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

  const handleStartTimeChange = (date: Date | null) => {
    if (!date) return;

    setStartTime(date);
    const validationResult = validateTimes(date, endTime);
    setValidationError(validationResult);
  };

  const handleEndTimeChange = (date: Date | null) => {
    if (!date) return;

    setEndTime(date);
    const validationResult = validateTimes(startTime, date);
    setValidationError(validationResult);
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsReady(true), 0);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [isOpen]);

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
          disabled: !!validationError,
        },
      ]}
    >
      {isReady && (
        <div>
          <div className="flex items-center space-x-4">
            <div>
              <label className="hidden">시작 시간</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => handleStartTimeChange(date)}
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
                placeholderText="시작 시간"
              />
            </div>
            <span>-</span>
            <div>
              <label className="hidden">종료 시간</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => handleEndTimeChange(date)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat="HH:mm"
                timeIntervals={1}
                dateFormat="HH:mm"
                timeCaption="Time"
                autoFocus={false}
                minTime={
                  startTime || new Date(`2024-01-01T${earliestSessionTime}`)
                }
                maxTime={new Date(`2024-01-01T${nextSessionStartTime}`)}
                placeholderText="종료 시간"
                className="border border-gray-300 rounded-md p-2 w-20 text-sm"
              />
            </div>
          </div>
          {validationError && (
            <p className="text-red-500 text-sm">{validationError}</p>
          )}
        </div>
      )}
    </Modal>
  );
}
