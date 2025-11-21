import Swal from "sweetalert2";

// interface AlertaProps { 
//     titulo: string;
//     texto: string;
//     icono: "success" | "error" | "warning" | "info" | "question";
// }

export default function alerta(titulo, texto, icono ) {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
  });
}
