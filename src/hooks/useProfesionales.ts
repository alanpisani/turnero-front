import { useEffect, useState } from "react";
import type Profesional from "../types/MyTurns/profesional";
import type { ResponseProps } from "../types/ResponseProps";

export default function useProfesionales(idEspecialidad: number | null){
    const [profesionales, setProfesionales] = useState<Profesional[]>([]);
    
      useEffect(() => {
        // cada vez que cambia la especialidad, reseteamos todo lo dependiente
        
        if (!idEspecialidad){
            setProfesionales([]);
            return;
        } 
    
        fetch(`http://localhost:5295/api/profesional/especialidad/${idEspecialidad}`)
          .then((res) => res.json())
          .then((data: ResponseProps<Profesional[]>) => {
            if (data.success && data.data) setProfesionales(data.data);
          })
          .catch(() => setProfesionales([]));
      }, [idEspecialidad]);

      return profesionales;
}