import * as Dialog from "@radix-ui/react-dialog";
import "./Modal.css";
import ActionButton from "../ActionButton/ActionButton";

interface ModalProps {
  triggerText: string;
  children: React.ReactNode;
}

export default function Modal({ triggerText, children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ActionButton leyend={ triggerText } isCreateButton/>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="dialog-content"
          aria-label="Modal genérico"
          aria-describedby={undefined}
        >
          
          {children}

          <Dialog.Close asChild>
            <ActionButton leyend="Cerrar" isCancelButton/>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
