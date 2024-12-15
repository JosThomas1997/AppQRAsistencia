import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/firebase/clase.service.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
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
  clases$!: Observable<Clase[]>; // Lista de clases
  alumnos: Array<Usuario & { estado?: string }> = []; // Lista de alumnos con su estado
  selectedClaseId: string = ''; // Clase seleccionada por el profesor
  estadoSeleccionado: string = 'presente'; // Estado para el filtro (presente por defecto)
  estudiantesFiltrados: Array<{ id: string; nombre: string }> = []; // Lista de estudiantes filtrados

  constructor(
    private claseService: ClaseService,
    private usuarioService: UsuarioService,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit() {
    this.getClases(); // Cargar las clases al iniciar
  }

  // Obtener todas las clases
  getClases() {
    this.clases$ = this.claseService.getClases();
  }

  // Obtener alumnos registrados como tipo 'alumno'
  getAlumnos() {
    this.usuarioService.getAlumnos().subscribe((data) => {
      // Inicializar los alumnos con el estado 'presente' por defecto
      this.alumnos = data.map((alumno) => ({ ...alumno, estado: 'presente' }));
    });
  }

  // Guardar la asistencia en Firestore
  guardarAsistencia() {
    this.alumnos.forEach((alumno) => {
      const asistencia: Asistencia = {
        claseId: this.selectedClaseId,
        alumnoId: alumno.email,
        estado: alumno.estado as 'presente' | 'ausente' | 'justificado',
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        estudiantes: [
          {
            id: alumno.email,
            nombre: alumno.name,
            estado: alumno.estado || 'presente',
          },
        ],
      };

      this.asistenciaService.registrarAsistencia(asistencia).then(() => {
        console.log(`Asistencia guardada para ${alumno.name}`);
      }).catch((error) => {
        console.error(`Error al guardar la asistencia de ${alumno.name}: `, error);
      });
    });
  }

  // Filtrar estudiantes por el estado seleccionado
  filtrarEstudiantes() {
    this.estudiantesFiltrados = this.alumnos
      .filter((alumno) => alumno.estado === this.estadoSeleccionado)
      .map((alumno) => ({
        id: alumno.email,
        nombre: alumno.name,
      }));
  }
}