interface SwitchuserStausBtnProps {
  handleUserStatus: (id: number, state: boolean) => void;
  idUsuario: number;
  isActiveUser: boolean;
}

export default function SwitchUserStatusBtn({
  handleUserStatus,
  idUsuario,
  isActiveUser,
}: SwitchuserStausBtnProps) {
  return (
    <button
      className={isActiveUser ? "disable-btn" : "enable-btn"}
      onClick={() => handleUserStatus(idUsuario, !isActiveUser)}
    >
      {isActiveUser ? "Desactivar" : "Activar"}
    </button>
  );
}
