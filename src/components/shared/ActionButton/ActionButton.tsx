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
  const classButton = isCancelButton
    ? "disable-btn"
    : isCreateButton
    ? "create-btn"
    : "enable-btn";

  return (
    <button className={classButton} onClick={onClick}>
      {leyend}
    </button>
  );
}
