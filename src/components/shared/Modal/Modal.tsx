import * as Dialog from "@radix-ui/react-dialog";
import "./Modal.css";

interface ModalProps {
  triggerText: string;
  children: React.ReactNode;
}

export default function Modal({ triggerText, children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>{triggerText}</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          {children}
          <Dialog.Close asChild>
            <button>Cerrar</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
