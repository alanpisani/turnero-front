import "./ActionButton.css";

interface ActionButtonProps {
  leyend: string;
  isCancelButton?: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  leyend,
  isCancelButton,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      className={
        "action-button " +
        (isCancelButton ? "cancel-button" : "normal-action-button")
      }
      onClick={onClick}
    >
      {leyend}
    </button>
  );
}
