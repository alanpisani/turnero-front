import generalImg from "../assets/img/odontologia_general.jpg";
import ortodonciaImg from "../assets/img/ortodoncia.jpg";
import cirujiaImg from "../assets/img/cirugia.jpg";
import endodonciaImg from "../assets/img/endononcia.jpg";

interface specialtyCard{
    srcImg: string;
    title: string;
    description: string;
}

export const specialitiesCardsData: specialtyCard[] = [
    {
        srcImg: generalImg,
        title: "Odontología general",
        description: "Las consultas por odontología general son fundamentales ya que garantizan la detección temprana de cualquier patología bucal."
    },
    {
        srcImg: ortodonciaImg,
        title: "Ortodoncia",
        description: "La ortodoncia es una especialidad que tiene un rol fundamental en la salud y estética bucal, lo que hace que sea uno de los tratamientos más conocidos y requeridos por los pacientes."
    },
    {
        srcImg: cirujiaImg,
        title: "Cirugía",
        description: "Tiene como objetivo devolver la estética y funcionalidad de la cavidad bucal y mejorar la calidad de vida."
    },
    {
        srcImg: endodonciaImg,
        title: "Endodoncia",
        description: "Es la especialidad encargada de realizar los tratamientos de conducto y consiste en la eliminación total del nervio del diente afectado."
    },
];