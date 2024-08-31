import { Session } from "@/types/ClassroomTypes";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteSessionModal from "@/components/Modals/DeleteSessionModal";
import { useClassroomStore } from "@/hooks/useClassroomStore";

interface ScheduleSessionProps {
  classroomId: number;
  timeOfDay: string;
  sessions: Session[];
}

export default function ScheduleSession({
  classroomId,
  timeOfDay,
  sessions,
}: ScheduleSessionProps) {
  const [isDeleteSessionModalOpen, setDeleteSessionModalOpen] = useState(false);

  const [sessionIdToDelete, setSessionIdToDelete] = useState<number | null>(
    null
  );
  const { removeSession } = useClassroomStore((state) => state);

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

  return (
    <div>
      <h3>{timeOfDay}</h3>
      <div>
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <div key={session.sessionId} className="flex space-x-2">
              <h4>{session.sessionId}교시</h4>
              <div>
                {session.startTime} - {session.endTime}
              </div>
              <Button
                variant="outline"
                onClick={() => openDeleteSessionModal(session.sessionId)}
              >
                <Trash2 />
              </Button>
            </div>
          ))
        ) : (
          <p>수업 없음</p>
        )}
      </div>
      <Button>+ {timeOfDay} 교시 추가</Button>

      <DeleteSessionModal
        isOpen={isDeleteSessionModalOpen}
        onClose={closeDeleteSessionModal}
        onConfirm={handleDeleteSession}
        sessionId={sessionIdToDelete ?? 0}
      />
    </div>
  );
}
