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
    const asistencia: Asistencia = {
      claseId: this.selectedClaseId,
      fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      estudiantes: this.alumnos.map(alumno => ({
        id: alumno.email, // Usa el email como identificador si no tienes un ID
        nombre: alumno.name,
        estado: alumno.estado || 'presente', // Valor por defecto 'presente'
      })),
    };

    this.asistenciaService.registrarAsistencia(asistencia).then(() => {
      alert('Asistencia guardada correctamente');
    }).catch(error => {
      console.error('Error al guardar la asistencia:', error);
    });
  }
}