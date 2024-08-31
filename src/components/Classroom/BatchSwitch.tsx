import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import BatchConfirmModal from "../Modals/BatchConfirmModal";
import { useBatchStore } from "@/hooks/useBatchStore";

export default function BatchSwitch() {
  const { isBatchActive, setBatchActive } = useBatchStore();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleSwitchChange = () => {
    if (!isBatchActive) {
      // 스위치가 켜질 때 확인 모달 열기
      setConfirmModalOpen(true);
    } else {
      // 스위치가 꺼질 때 배치 모드를 비활성화
      setBatchActive(false);
    }
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const handleConfirm = async () => {
    setBatchActive(true);
    closeConfirmModal();
  };

  return (
    <div className="flex space-x-3">
      <Switch checked={isBatchActive} onCheckedChange={handleSwitchChange} />
      <p>모든 교실 동일 시간표 적용</p>

      <BatchConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
