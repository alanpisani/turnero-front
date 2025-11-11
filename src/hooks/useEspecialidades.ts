import { useEffect, useState } from "react";
import type Especialidad from "../types/MyTurns/especialidad";
import type { ResponseProps } from "../types/ResponseProps";
import { API_URL } from "../config/apiConfig";

export function useEspecialidades(){
    const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
    
    // Cargar especialidades al inicio
    useEffect(() => {
        fetch(`${API_URL}/especialidad/all`)
        .then((res) => res.json())
        .then((data: ResponseProps<Especialidad[]>) => {
            if (data.success && data.data) setEspecialidades(data.data);
        })
        .catch(() => setEspecialidades([]));
    }, []);

    return especialidades;
}