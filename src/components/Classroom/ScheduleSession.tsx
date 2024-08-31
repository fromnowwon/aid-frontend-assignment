import { Session, TimeOfDay } from "@/types/ClassroomTypes";
import { Pen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddSessionModal from "@/components/Modals/AddSessionModal";
import DeleteSessionModal from "@/components/Modals/DeleteSessionModal";
import { useClassroomStore } from "@/store/useClassroomStore";
import EditSessionModal from "../Modals/EditSessionModal";

interface ScheduleSessionProps {
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

const MAX_SESSIONS = 5;

export default function ScheduleSession({
  classroomId,
  timeOfDay,
  sessions,
}: ScheduleSessionProps) {
  const timeTitle =
    timeOfDay === "morning"
      ? "오전"
      : timeOfDay === "afternoon"
      ? "오후"
      : "저녁";

  const [isAddSessionModalOpen, setAddSessionModalOpen] = useState(false);
  const [isEditSessionModalOpen, setEditSessionModalOpen] = useState(false);
  const [isDeleteSessionModalOpen, setDeleteSessionModalOpen] = useState(false);

  const [sessionIdToEdit, setSessionIdToEdit] = useState<number | null>(null);
  const [sessionIdToDelete, setSessionIdToDelete] = useState<number | null>(
    null
  );

  const { removeSession } = useClassroomStore((state) => state);

  const openAddSessionModal = () => setAddSessionModalOpen(true);
  const closeAddSessionModal = () => setAddSessionModalOpen(false);

  // 삭제 모달 열기
  const openDeleteSessionModal = (sessionId: number) => {
    setSessionIdToDelete(sessionId);
    setDeleteSessionModalOpen(true);
  };

  // 삭제 모달 닫기
  const closeDeleteSessionModal = () => {
    setDeleteSessionModalOpen(false);
    setSessionIdToDelete(null);
  };

  // 수정 모달 열기
  const openEditSessionModal = (sessionId: number) => {
    setSessionIdToEdit(sessionId);
    setEditSessionModalOpen(true);
  };

  // 수정 모달 닫기
  const closeEditSessionModal = () => {
    setEditSessionModalOpen(false);
    setSessionIdToEdit(null);
  };

  // 교시 삭제
  const handleDeleteSession = async () => {
    if (sessionIdToDelete !== null) {
      await removeSession(classroomId, sessionIdToDelete);
      closeDeleteSessionModal();
    }
  };

  const sortedSessions = [...sessions].sort(
    (a, b) => a.sessionId - b.sessionId
  );

  // 이전 세션의 종료 시간 구하기
  const getPrevSessionEndTime = (sessionId: number) => {
    const sessionIndex = sortedSessions.findIndex(
      (session) => session.sessionId === sessionId
    );
    if (sessionIndex > 0) {
      const prevSession = sortedSessions[sessionIndex - 1];
      return prevSession.endTime;
    }
    return TIME_RANGES[timeOfDay as TimeOfDay].start; // 이전 세션이 없을 경우 해당 시간대의 가장 이른 시간
  };

  // 다음 세션의 시작 시간 구하기
  const getNextSessionEndTime = (sessionId: number) => {
    const sessionIndex = sortedSessions.findIndex(
      (session) => session.sessionId === sessionId
    );
    if (sessionIndex >= 0 && sessionIndex < sortedSessions.length - 1) {
      const nextSession = sortedSessions[sessionIndex + 1];
      return nextSession.startTime;
    }
    return TIME_RANGES[timeOfDay as TimeOfDay].end;
  };

  // 빈칸
  const paddedSessions = [
    ...sessions,
    ...Array(MAX_SESSIONS - sessions.length).fill(null),
  ];

  return (
    <div className="border border-slate-200">
      <h3 className="w-full text-center text-sm p-2 bg-slate-200">
        {timeTitle}
      </h3>

      <div className="flex flex-col space-y-4 pb-4">
        <div
          className="px-3 pt-3 grid"
          style={{ gridTemplateRows: `repeat(${MAX_SESSIONS}, 1fr)` }}
        >
          {paddedSessions.map((session, index) => (
            <div
              key={index}
              className={`flex items-center p-2 border-b ${
                session ? "" : "opacity-50"
              }`}
              style={{ minWidth: "210px", height: "50px" }}
            >
              {session ? (
                <div className="flex items-center w-full justify-between space-x-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-semibold">
                      {session.sessionId}교시
                    </h4>
                    <div className="text-sm">
                      {session.startTime} - {session.endTime}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditSessionModal(session.sessionId)}
                      className="w-6 h-6"
                    >
                      <Pen className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteSessionModal(session.sessionId)}
                      className="w-6 h-6"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm"></p>
              )}
            </div>
          ))}
        </div>
        <div className="px-3">
          <Button
            onClick={openAddSessionModal}
            disabled={sessions.length >= MAX_SESSIONS}
            className="w-full"
          >
            + {timeTitle} 교시 추가
          </Button>
        </div>
      </div>

      <AddSessionModal
        isOpen={isAddSessionModalOpen}
        onClose={closeAddSessionModal}
        classroomId={classroomId}
        timeOfDay={timeOfDay}
        sessions={sortedSessions}
      />

      {sessionIdToEdit !== null && (
        <EditSessionModal
          isOpen={isEditSessionModalOpen}
          onClose={closeEditSessionModal}
          classroomId={classroomId}
          sessionId={sessionIdToEdit}
          prevSessionEndTime={getPrevSessionEndTime(sessionIdToEdit)}
          nextSessionStartTime={getNextSessionEndTime(sessionIdToEdit)}
          earliestSessionTime={TIME_RANGES[timeOfDay as TimeOfDay].start}
        />
      )}

      {sessionIdToDelete !== null && (
        <DeleteSessionModal
          isOpen={isDeleteSessionModalOpen}
          onClose={closeDeleteSessionModal}
          onConfirm={handleDeleteSession}
          sessionId={sessionIdToDelete}
        />
      )}
    </div>
  );
}
