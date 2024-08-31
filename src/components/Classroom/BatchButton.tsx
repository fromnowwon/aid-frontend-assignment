import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import BatchConfirmModal from "../Modals/BatchConfirmModal";
import { useClassroomStore } from "@/store/useClassroomStore";

export default function BatchButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { classrooms, activeClassroomId, applySessionsToAllClassrooms } =
    useClassroomStore();

  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleButtonClick = () => {
    setConfirmModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setConfirmModalOpen(false);

    // 현재 활성화된 classroom의 sessions을 다른 classroom에 적용
    const activeClassroom = classrooms.find(
      (classroom) => classroom.id === activeClassroomId
    );

    if (activeClassroom) {
      try {
        await applySessionsToAllClassrooms(activeClassroom.sessions);
      } catch (error) {
        console.error("모든 교실에 세션 복사 실패:", error);
      }
    }

    setIsLoading(false);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="flex space-x-3">
      {isLoading ? (
        <Button disabled className="min-w-[181px]">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          onClick={handleButtonClick}
          variant="outline"
          className="text-sm min-w-[181px]"
        >
          모든 교실 동일 시간표 적용
        </Button>
      )}

      <BatchConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
