import { useEffect, useState } from "react";
import type Especialidad from "../types/MyTurns/especialidad";
import type { ResponseProps } from "../types/ResponseProps";

export function useEspecialidades(){
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    
    // Cargar especialidades al inicio
    useEffect(() => {
        fetch("http://localhost:5295/api/especialidad")
        .then((res) => res.json())
        .then((data: ResponseProps<Especialidad[]>) => {
            if (data.success && data.data) setEspecialidades(data.data);
        })
        .catch(() => setEspecialidades([]));
    }, []);

    return especialidades;
}