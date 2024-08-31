import Modal from "../layout/Modal";

interface BatchConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BatchConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: BatchConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="설정 확인"
      description="이 설정을 모든 classroom에 적용하시겠습니까?"
      footerButtons={[
        {
          label: "취소",
          onClick: onClose,
          variant: "outline",
        },
        {
          label: "적용",
          onClick: onConfirm,
          variant: "default",
          type: "submit",
        },
      ]}
    >
      <div></div>
    </Modal>
  );
}
