import "./ActionButton.css";

interface ActionButtonProps {
  leyend: string;
  isCancelButton?: boolean;
  isCreateButton?: boolean;
  onClick?: () => void;
}

export default function ActionButton({
  leyend,
  isCancelButton,
  isCreateButton,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      className={
        (isCancelButton ? "disable-btn" : "enable-btn") +
        " " +
        (isCreateButton ? "create-btn" : "enable-btn")
      }
      onClick={onClick}
    >
      {leyend}
    </button>
  );
}
