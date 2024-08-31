import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FooterButton {
  label: string;
  onClick: () => void;
  type?: "button" | "submit";
  variant?: "default" | "outline" | "destructive";
  isVisible?: boolean;
  disabled?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footerButtons: FooterButton[];
}

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  footerButtons,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter>
          {footerButtons.map((button, index) =>
            button.isVisible !== false ? (
              <Button
                key={index}
                type={button.type || "button"}
                variant={button.variant || "default"}
                onClick={button.onClick}
                disabled={button.disabled}
              >
                {button.label}
              </Button>
            ) : null
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
