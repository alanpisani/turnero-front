
export interface usuario {
  idUsuario: number;
  nombre: string;
  apellido: string | null;
  dni: number;
  email: string | null;
  rol: string;
  fechaNacimiento: string;
  isActive: boolean;
}