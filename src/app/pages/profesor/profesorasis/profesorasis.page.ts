import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/firebase/clase.service.service'; // Service para obtener las clases
import { UsuarioService } from 'src/app/services/usuarios.service'; // Service para obtener los alumnos
import { AsistenciaService } from 'src/app/services/firebase/asistencia.service.service';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/interfaces/clase';
import { Usuario } from 'src/app/interfaces/usuario';
import { Asistencia } from 'src/app/interfaces/asistencia';

@Component({
  selector: 'app-profesorasis',
  templateUrl: './profesorasis.page.html',
  styleUrls: ['./profesorasis.page.scss'],
})
export class ProfesorasisPage {
  clases$!: Observable<Clase[]>; // Modificado para evitar el error
  alumnos: Array<Usuario & { estado?: string }> = []; // Añadimos 'estado' temporalmente
  selectedClaseId: string = ''; // ID de la clase seleccionada

  constructor(
    private claseService: ClaseService,
    private usuarioService: UsuarioService,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    this.getClases(); // Obtener todas las clases al iniciar
  }

  // Obtener las clases desde el ClaseService
  getClases() {
    this.clases$ = this.claseService.getClases();
  }

  // Obtener alumnos desde UsuarioService, filtrando por tipo 'alumno'
  getAlumnos() {
    this.usuarioService.getAlumnos().subscribe(data => {
      // Inicializamos 'estado' para cada alumno
      this.alumnos = data.map(alumno => ({ ...alumno, estado: 'presente' }));
    });
  }

  // Guardar la asistencia en Firestore utilizando AsistenciaService
  guardarAsistencia() {
    this.alumnos.forEach(alumno => {
      const asistencia: Asistencia = {
        claseId: this.selectedClaseId,
        alumnoId: alumno.email,  // Campo obligatorio: asignamos el email del alumno como ID
        estado: alumno.estado as 'presente' | 'ausente' | 'justificado' || 'presente',  // Asignamos el estado o 'presente' por defecto
        fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
        estudiantes: [{ 
          id: alumno.email, 
          nombre: alumno.name, 
          estado: alumno.estado || 'presente'  // Estado opcional dentro de estudiantes
        }]
      };
  
      // Guardamos la asistencia en Firestore
      this.asistenciaService.registrarAsistencia(asistencia).then(() => {
        console.log(`Asistencia guardada para ${alumno.name}`);
      }).catch(error => {
        console.error(`Error al guardar la asistencia de ${alumno.name}: `, error);
      });
    });
  }
}  