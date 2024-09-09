import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasesPorDia, Clase } from 'src/app/interfaces/clase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  diaDefault: string = 'lunes'; 
  selectedClass: Clase | null = null;

  // Asegúrate de incluir todos los días de la semana
  clases: ClasesPorDia = {
    lunes: [
      { nombre: 'Arquitectura', bloques: [{ start: '10:00 AM', end: '11:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Programación Móvil', bloques: [{ start: '8:00 AM', end: '9:30 AM' }, { start: '10:00 AM', end: '11:00 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    martes: [
      { nombre: 'Calidad de Software', bloques: [{ start: '9:00 AM', end: '10:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Matemática Descriptiva', bloques: [{ start: '11:00 AM', end: '12:30 PM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    miércoles: [
      { nombre: 'Programación Móvil', bloques: [{ start: '9:00 AM', end: '10:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Programación Móvil', bloques: [{ start: '1:00 PM', end: '2:30 PM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    jueves: [
      { nombre: 'Portafolio 4', bloques: [{ start: '10:00 AM', end: '11:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Ética para el Trabajo', bloques: [{ start: '2:00 PM', end: '3:30 PM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    viernes: [
      { nombre: 'Calidad de Software', bloques: [{ start: '9:00 AM', end: '10:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Arquitectura', bloques: [{ start: '11:00 AM', end: '12:30 PM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
  };

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  getClasesporDia(): Clase[] {
    return this.clases[this.diaDefault] || [];
  }

  verDetalleclases(clase: Clase) {
    this.router.navigate(['detalle-clases', clase.nombre]);
  }

  onDayChange(event: any) {
    this.diaDefault = event.detail.value;
  }

  async selectClass(clase: Clase) {
    this.selectedClass = clase;

    const alert = await this.alertController.create({
      header: 'Generar Código QR',
      message: `¿Deseas generar un código QR para la clase ${clase.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.generateQRCode();
          },
        },
      ],
    });

    await alert.present();
  }

  generateQRCode() {
    if (this.selectedClass) {
      // Aquí puedes implementar la lógica para generar el código QR.
      // Por ahora solo muestra un mensaje.
      alert(`Código QR generado para la clase ${this.selectedClass.nombre} `);
      
      // Guardar la fecha y hora actual en el almacenamiento local.
      const now = new Date();
      const record = {
        clase: this.selectedClass.nombre,
        fecha: now.toLocaleDateString(),
        hora: now.toLocaleTimeString()
      };
      localStorage.setItem('asistencia', JSON.stringify(record));
    }
  }
}
