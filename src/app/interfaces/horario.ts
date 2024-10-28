import { Clase } from "./clase";

export interface Horario {
    id: string;
    profesorId?: string; 
    alumnoId?: string; 
    clases: Clase[];
  }
  