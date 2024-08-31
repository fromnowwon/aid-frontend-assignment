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
      title="모든 교실 동일 시간표 적용"
      description={`현재 교실의 시간표를 모든 교실에 적용하시겠습니까?\n이 작업은 취소할 수 없습니다.`}
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
      children={undefined}
    ></Modal>
  );
}
