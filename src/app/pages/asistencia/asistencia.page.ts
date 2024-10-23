import { Component, OnInit } from '@angular/core';
import { ClaseService } from 'src/app/services/firebase/clase.service.service';
import { AsistenciaService } from 'src/app/services/firebase/asistencia.service.service';
import { Clase } from 'src/app/interfaces/clase';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { Observable, of } from 'rxjs';
import { AlertController } from '@ionic/angular'; // Importar para el mensaje de éxito
@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  clases$: Observable<Clase[]> = of([]); // Inicializa con un Observable vacío
  selectedClaseId: string = ''; // ID de la clase seleccionada
  qrCodeData: string = ''; // Información para generar el QR

  constructor(
    private claseService: ClaseService,
    private asistenciaService: AsistenciaService,
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getClases(); // Obtener todas las clases al iniciar
  }

  // Obtener las clases desde el ClaseService
  getClases() {
    this.clases$ = this.claseService.getClases();
  }

  // Acción al seleccionar una clase
  onClassSelected() {
    this.qrCodeData = ''; // Limpiar cualquier QR previo al seleccionar nueva clase
  }

  // Generar el código QR con la información de la clase y el alumno
  generateQRCode() {
    this.usuarioService.getCurrentUser().subscribe(user => {
      if (user) {
        // Información del QR que se codifica
        this.qrCodeData = JSON.stringify({
          claseId: this.selectedClaseId,
          alumnoId: user.email, // Usa el email como identificador
          fecha: new Date().toISOString().split('T')[0] // Fecha actual
        });
      } else {
        console.error('No hay usuario logueado');
      }
    });
  }

  // Simulación de escaneo de QR
  scanQRCode() {
    if (this.qrCodeData) {
      this.registrarAsistencia(); // Aquí registras la asistencia
    } else {
      alert('Debes generar un código QR primero.');
    }
  }

  // Registrar asistencia en Firestore
  registrarAsistencia() {
    const asistenciaData = JSON.parse(this.qrCodeData);

    const asistencia = {
      claseId: asistenciaData.claseId,
      fecha: asistenciaData.fecha,
      estudiantes: [
        {
          id: asistenciaData.alumnoId,
          nombre: 'Alumno Actual', // Puedes obtener el nombre del usuario logueado si es necesario
          estado: 'presente'
        }
      ]
    };

    this.asistenciaService.registrarAsistencia(asistencia).then(() => {
      alert('Asistencia registrada correctamente.');
    }).catch(error => {
      console.error('Error al registrar la asistencia:', error);
    });
  }
}