import { Session } from "@/types/ClassroomTypes";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddSessionModal from "@/components/Modals/AddSessionModal";
import DeleteSessionModal from "@/components/Modals/DeleteSessionModal";
import { useClassroomStore } from "@/hooks/useClassroomStore";

interface ScheduleSessionProps {
  classroomId: number;
  timeOfDay: string;
  sessions: Session[];
}

const MAX_SESSIONS = 5;

export default function ScheduleSession({
  classroomId,
  timeOfDay,
  sessions,
}: ScheduleSessionProps) {
  const timeTitle =
    timeOfDay === "morning" ? "오전" : timeOfDay === "lunch" ? "오후" : "저녁";
  const [isAddSessionModalOpen, setAddSessionModalOpen] = useState(false);
  const [isDeleteSessionModalOpen, setDeleteSessionModalOpen] = useState(false);

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

  // 수업 삭제
  const handleDeleteSession = async () => {
    if (sessionIdToDelete !== null) {
      await removeSession(classroomId, sessionIdToDelete);
      closeDeleteSessionModal();
    }
  };

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
              style={{ minWidth: "200px", height: "50px" }}
            >
              {session ? (
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm">{session.sessionId}교시</h4>
                    <div className="text-sm">
                      {session.startTime} - {session.endTime}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openDeleteSessionModal(session.sessionId)}
                    className=""
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
        sessions={sessions}
      />

      <DeleteSessionModal
        isOpen={isDeleteSessionModalOpen}
        onClose={closeDeleteSessionModal}
        onConfirm={handleDeleteSession}
        sessionId={sessionIdToDelete ?? 0}
      />
    </div>
  );
}
