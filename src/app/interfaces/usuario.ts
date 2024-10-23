export interface Usuario {
  name: string;
  email: string;
  tipo: string;
  pass: string;
  estado?: string; // Opcional: Agregar estado si es necesario
}
