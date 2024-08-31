import Modal from "../layout/Modal";

interface DeleteSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionId: number;
}

export default function DeleteSessionModal({
  isOpen,
  onClose,
  onConfirm,
  sessionId,
}: DeleteSessionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="교시 삭제"
      description={`${sessionId}교시를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.`}
      footerButtons={[
        {
          label: "취소",
          onClick: onClose,
          variant: "outline",
        },
        {
          label: "삭제",
          onClick: onConfirm,
          variant: "destructive",
        },
      ]}
      children={undefined}
    ></Modal>
  );
}
