// src/app/interfaces/clase.ts
export interface TimeBlock {
    start: string;
    end: string;
  }
  
  export interface Clase {
    nombre: string;
    bloques: TimeBlock[];
    imagen: string;
  }
  
  export interface ClasesPorDia {
    [key: string]: Clase[];
  }
  