import { Clase } from "./clase";

export interface Horario {
    id: string;
    profesorId?: string; // Si es para el profesor
    alumnoId?: string; // Si es para el alumno
    clases: Clase[];
  }
  