import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Session, TimeOfDay } from "@/types/ClassroomTypes";
import { useClassroomStore } from "@/store/useClassroomStore";
import Modal from "../layout/Modal";
import { Label } from "@/components/ui/label";
import { useMealTimeStore } from "@/store/useMealTimeStore";
import { validateTimes } from "@/lib/utils";

interface AddSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroomId: number;
  timeOfDay: string;
  sessions: Session[];
}

/** 시간대 범위
 * 오전: 00:00~12:00
 * 오후: 13:00~19:00
 * 저녁: 19:00~23:59
 */
interface TIME_RANGE {
  start: string;
  end: string;
}

const TIME_RANGES: Record<TimeOfDay, TIME_RANGE> = {
  morning: { start: "00:00", end: "12:00" },
  afternoon: { start: "13:00", end: "19:00" },
  evening: { start: "19:00", end: "23:59" },
};

export default function AddSessionModal({
  isOpen,
  onClose,
  classroomId,
  timeOfDay,
  sessions,
}: AddSessionModalProps) {
  const timeTitle =
    timeOfDay === "morning"
      ? "오전"
      : timeOfDay === "afternoon"
      ? "오후"
      : "저녁";

  const { getClassrooms, addSession, setActiveClassroomId } = useClassroomStore(
    (state) => state
  );
  const mealTimes = useMealTimeStore((state) => state.mealTimes);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [newSessionId, setNewSessionId] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchAndSetSessionId = async () => {
      try {
        // 전체 세션을 가져옴
        const allSessions = await useClassroomStore
          .getState()
          .getClassroomSessions(classroomId);

        // 각 시간대의 최대 교시 ID
        const getMaxSessionIdByTimeOfDay = (timeOfDay: TimeOfDay) => {
          const filteredSessions = allSessions.filter(
            (session) => session.timeOfDay === timeOfDay
          );
          return filteredSessions.length > 0
            ? Math.max(...filteredSessions.map((session) => session.sessionId))
            : 0;
        };

        // 현재 시간대의 교시가 없을 경우, 이전 시간대의 최대 교시를 가져옴
        const getMaxSessionIdForNewSession = () => {
          switch (timeOfDay) {
            case "morning":
              return getMaxSessionIdByTimeOfDay("morning");
            case "afternoon":
              return getMaxSessionIdByTimeOfDay("morning");
            case "evening":
              return getMaxSessionIdByTimeOfDay("afternoon");
            default:
              return 0;
          }
        };

        // 현재 시간대에 교시가 있다면 현재 시간대의 최대 교시
        // 현재 시간대에 교시가 없다면 이전 시간대의 최대 교시
        const maxCurrentSessionId =
          sessions.length > 0
            ? Math.max(...sessions.map((session) => session.sessionId))
            : getMaxSessionIdForNewSession();

        // 새로 추가할 교시 ID
        const newSessionId = maxCurrentSessionId + 1;
        setNewSessionId(newSessionId);
      } catch (error) {
        console.error("세션 ID 설정 오류:", error);
      }
    };

    if (isOpen) {
      fetchAndSetSessionId();
      const timer = setTimeout(() => setIsReady(true), 0);
      return () => clearTimeout(timer);
    } else {
      setIsReady(false);
    }
  }, [classroomId, timeOfDay, isOpen, sessions]);

  // 현재 세션 시간 범위
  const { start: rangeStart, end: rangeEnd } = TIME_RANGES[
    timeOfDay as TimeOfDay
  ] || {
    start: "00:00",
    end: "23:59",
  };

  // 현재 세션의 마지막 교시 종료 시간 = 시작으로 지정할 수 있는 시간
  const possibleStartTime = sessions.length
    ? new Date(`2024-01-01T${sessions[sessions.length - 1].endTime}`)
    : new Date(`2024-01-01T${rangeStart}`); // 세션에 교시가 하나도 없는 경우 범위 내 시작 시간으로 설정

  const possibleEndTime = new Date(`2024-01-01T${rangeEnd}`);

  // 식사 시간 범위를 비활성화
  const mealTimesArray = Object.values(mealTimes);
  const isTimeWithinMealTimes = (time: Date) => {
    const timeStr = time.toTimeString().slice(0, 5);
    return mealTimesArray.some(
      (mealTime) => timeStr >= mealTime.startTime && timeStr <= mealTime.endTime
    );
  };

  const handleSave = async () => {
    if (!startTime || !endTime) return;

    // 시간 포맷을 "HH:mm" 형식으로 변경
    const formattedStartTime = startTime.toTimeString().slice(0, 5);
    const formattedEndTime = endTime.toTimeString().slice(0, 5);

    // 식사 시간과 겹치는지 체크
    if (isTimeWithinMealTimes(startTime) || isTimeWithinMealTimes(endTime)) {
      alert("식사 시간과 겹치는 교시는 추가할 수 없습니다.");
      return;
    }

    try {
      if (formattedStartTime && formattedEndTime) {
        await addSession(
          classroomId,
          timeOfDay,
          formattedStartTime,
          formattedEndTime,
          newSessionId
        );

        // 교실 정보를 다시 가져와 상태를 업데이트
        await getClassrooms();
        setActiveClassroomId(classroomId);
      }

      onClose();
    } catch (error) {
      console.error("교시 추가 실패", error);
    }
  };

  const handleCancel = () => {
    onClose();
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="교시 추가"
      description="새 교시를 추가하려면 아래 정보를 입력하십시오."
      footerButtons={[
        {
          label: "취소",
          onClick: handleCancel,
          variant: "outline",
        },
        {
          label: "저장",
          onClick: handleSave,
          variant: "default",
          type: "submit",
          disabled: !!validationError,
        },
      ]}
    >
      {isReady && (
        <div>
          <div className="border">
            <h3 className="font-semibold text-sm bg-slate-200 py-2 px-3">
              {timeTitle} 리스트
            </h3>
            <ul className="p-3">
              {sessions.map((session) => (
                <li key={session.sessionId} className="flex space-x-3">
                  <div className="text-sm font-semibold">
                    {session.sessionId}교시
                  </div>
                  <div className="text-sm">
                    {session.startTime} - {session.endTime}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-3 items-center mt-3">
            <div className="text-sm font-semibold">+ {newSessionId}교시</div>
            <div className="flex space-x-2 items-center">
              <div className="">
                <Label htmlFor="start" className="hidden">
                  시작 시간
                </Label>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => handleStartTimeChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  timeCaption="Time"
                  timeIntervals={1}
                  autoFocus={false}
                  minTime={possibleStartTime}
                  maxTime={possibleEndTime}
                  filterTime={(time) => {
                    const selectedTime = new Date(
                      `2024-01-01T${time.toTimeString().slice(0, 5)}`
                    );
                    return (
                      selectedTime >= possibleStartTime &&
                      selectedTime <= possibleEndTime &&
                      !isTimeWithinMealTimes(selectedTime) // 식사 시간 겹침 체크
                    );
                  }}
                  placeholderText="시작 시간"
                  className="border border-gray-300 rounded-md p-2 w-20 text-sm"
                />
              </div>
              <span>-</span>
              <div className="flex">
                <Label htmlFor="end" className="hidden">
                  종료 시간
                </Label>
                <DatePicker
                  selected={endTime}
                  onChange={(date) => handleEndTimeChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeFormat="HH:mm"
                  dateFormat="HH:mm"
                  timeCaption="Time"
                  timeIntervals={1}
                  autoFocus={false}
                  minTime={startTime || possibleStartTime}
                  maxTime={possibleEndTime}
                  filterTime={(time) => {
                    const selectedTime = new Date(
                      `2024-01-01T${time.toTimeString().slice(0, 5)}`
                    );
                    return (
                      selectedTime >= possibleStartTime &&
                      selectedTime <= possibleEndTime &&
                      !isTimeWithinMealTimes(selectedTime) // 식사 시간 겹침 체크
                    );
                  }}
                  placeholderText="종료 시간"
                  className="border border-gray-300 rounded-md p-2 w-20 text-sm"
                />
              </div>
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
