import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el router para la navegación
import { ClaseService } from 'src/app/services/firebase/clase.service.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AsistenciaService } from 'src/app/services/firebase/asistencia.service.service';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/interfaces/clase';
import { Usuario } from 'src/app/interfaces/usuario';
import { Asistencia } from 'src/app/interfaces/asistencia';



@Component({
  selector: 'app-profesorasisqr',
  templateUrl: './profesorasisqr.page.html',
  styleUrls: ['./profesorasisqr.page.scss'],
})
export class ProfesorasisqrPage {
  clases$!: Observable<Clase[]>; // Para obtener todas las clases
  alumnos: Array<Usuario & { estado?: string }> = []; // Añadimos 'estado' temporalmente
  selectedClaseId: string = ''; // ID de la clase seleccionada
  qrCodeString: string = ''; // Variable para almacenar el valor del QR

  constructor(
    private claseService: ClaseService,
    private usuarioService: UsuarioService,
    private asistenciaService: AsistenciaService,
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

  guardarAsistencia() {
    this.alumnos.forEach(alumno => {
      const asistencia: Asistencia = {
        claseId: this.selectedClaseId,
        alumnoId: alumno.email,  // Usamos el email como identificador único del alumno
        estado: alumno.estado as 'presente' | 'ausente' | 'justificado' || 'presente',  // Aseguramos el tipo y asignamos 'presente' por defecto
        fecha: new Date().toISOString().split('T')[0], // Fecha actual
        estudiantes: [{ 
          id: alumno.email, 
          nombre: alumno.name, 
          estado: alumno.estado || 'presente'  // Asignamos 'presente' si no está definido
        }]
      };
  
      // Guardar asistencia en Firestore
      this.asistenciaService.registrarAsistencia(asistencia).then(() => {
        console.log(`Asistencia guardada para ${alumno.name}`);
      }).catch(error => {
        console.error(`Error al guardar la asistencia de ${alumno.name}: `, error);
      });
    });
  }

  // Función para generar el QR basado en la clase seleccionada
  generarQRCode() {
    if (this.selectedClaseId) {
      // Generamos el valor del código QR
      this.qrCodeString = this.selectedClaseId;
    } else {
      alert('Por favor selecciona una clase primero');
    }
  }
}