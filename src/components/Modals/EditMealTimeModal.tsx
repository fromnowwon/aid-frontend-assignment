import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "@/components/layout/Modal";
import { useMealTimeStore } from "@/hooks/useMealTimeStore";
import { useClassroomStore } from "@/hooks/useClassroomStore";
import { Session } from "@/types/ClassroomTypes";

interface EditMealTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealType: string;
  classroomId: number;
}

export default function EditMealTimeModal({
  isOpen,
  onClose,
  mealType,
  classroomId,
}: EditMealTimeModalProps) {
  const mealTypeTitle = mealType === "lunch" ? "점심" : "저녁";

  const { fetchMealTimes, updateMealTime } = useMealTimeStore();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);

  // 식사 시간 범위 설정
  const getTimeRange = () => {
    switch (mealType) {
      case "lunch":
        return { start: "11:00", end: "14:00" };
      case "dinner":
        return { start: "17:00", end: "20:00" };
      default:
        return { start: "00:00", end: "23:59" };
    }
  };
  const { start: rangeStart, end: rangeEnd } = getTimeRange();

  // 모든 세션 가져오기
  const fetchAllSessions = async () => {
    try {
      const allSessions = await useClassroomStore
        .getState()
        .getClassroomSessions(classroomId);
      setSessions(allSessions);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      setSessions([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAllSessions();
    }
  }, [isOpen]);

  const getDisabledTimes = () => {
    const disabledTimes: Date[] = [];

    // 식사 시간 범위 내에 모든 세션의 시작 및 종료 시간을 추가
    sessions.forEach((session) => {
      const sessionStart = new Date(`2024-01-01T${session.startTime}:00`);
      const sessionEnd = new Date(`2024-01-01T${session.endTime}:00`);

      // 현재 식사 시간 범위와 비교하여 비활성화할 시간 추가
      if (
        (sessionStart >= new Date(`2024-01-01T${rangeStart}:00`) &&
          sessionStart < new Date(`2024-01-01T${rangeEnd}:00`)) ||
        (sessionEnd > new Date(`2024-01-01T${rangeStart}:00`) &&
          sessionEnd <= new Date(`2024-01-01T${rangeEnd}:00`))
      ) {
        disabledTimes.push(sessionStart, sessionEnd);
      }
    });

    return disabledTimes;
  };

  const disabledTimes = getDisabledTimes();

  const handleSave = async () => {
    try {
      if (!startTime || !endTime) return;

      // 시간 포맷을 "HH:mm" 형식으로 변경
      const formattedStartTime = startTime.toTimeString().slice(0, 5);
      const formattedEndTime = endTime.toTimeString().slice(0, 5);

      await updateMealTime(mealType, formattedStartTime, formattedEndTime);
      await fetchMealTimes();
      onClose();
    } catch (error) {
      console.error("식사 시간 수정 오류:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${mealTypeTitle} 시간 수정`}
      description={`${mealTypeTitle} 시간을 수정할 수 있습니다.\n수업과 중복될 수 없습니다.`}
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
            minTime={new Date(`2024-01-01T${rangeStart}:00`)}
            maxTime={new Date(`2024-01-01T${rangeEnd}:00`)}
            excludeTimes={disabledTimes}
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
            minTime={new Date(`2024-01-01T${rangeStart}:00`)}
            maxTime={new Date(`2024-01-01T${rangeEnd}:00`)}
            excludeTimes={disabledTimes}
            className="border border-gray-300 rounded-md p-2 w-20 text-sm"
          />
        </div>
      </div>
    </Modal>
  );
}
