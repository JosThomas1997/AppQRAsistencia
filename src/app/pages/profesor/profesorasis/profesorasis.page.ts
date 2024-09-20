import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Estudiante {
  id: number;
  nombre: string;
  estado: 'presente' | 'ausente' | 'justificado';
}

@Component({
  selector: 'app-profesorasis',
  templateUrl: './profesorasis.page.html',
  styleUrls: ['./profesorasis.page.scss'],
})
export class ProfesorasisPage {
  className: string = '';
  date: string = new Date().toISOString().split('T')[0];
  students: Estudiante[] = [
    { id: 1, nombre: "Alice Johnson", estado: 'presente' },
    { id: 2, nombre: "Bob Smith", estado: 'presente' },
    { id: 3, nombre: "Charlie Brown", estado: 'presente' },
    { id: 4, nombre: "Diana Ross", estado: 'presente' },
    { id: 5, nombre: "Ethan Hunt", estado: 'presente' },
    { id: 6, nombre: "Fiona Apple", estado: 'presente' },
    { id: 7, nombre: "George Michael", estado: 'presente' },
    { id: 8, nombre: "Hannah Montana", estado: 'presente' }
  ];

  constructor(private alertController: AlertController) {}

  async submitAttendance() {
    console.log('Clase:', this.className);
    console.log('Fecha:', this.date);
    console.log('Asistencia:', this.students);

    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Se ha enviado la asistencia exitosamente',
      buttons: ['OK']
    });

    await alert.present();
  }
}