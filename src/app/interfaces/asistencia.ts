export interface Asistencia {
  id?: string; 
  claseId: string;
  alumnoId: string;
  estado: 'presente' | 'ausente' | 'justificado';
  fecha: string;
  estudiantes?: { id: string; nombre: string; estado: string }[];
}
