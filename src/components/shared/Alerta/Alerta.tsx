import Swal from "sweetalert2";
import "./Alerta.css";

interface AlertaProps {
  titulo: string;
  texto: string;
  icono: "success" | "error" | "warning" | "info" | "question";
  isCancelButton?: boolean;
}

export default function Alerta({
  titulo,
  texto,
  icono,
  isCancelButton,
}: AlertaProps) {
  return Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    showCancelButton: !!isCancelButton,
    confirmButtonColor: "#28d3d2",
  });
}
