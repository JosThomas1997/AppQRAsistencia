import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Student {
  id: string;
  name: string;
  checkInTime: Date;
}

@Component({
  selector: 'app-profesorasisqr',
  templateUrl: './profesorasisqr.page.html',
  styleUrls: ['./profesorasisqr.page.scss'],
})
export class ProfesorasisqrPage implements OnInit{
  className: string = '';
  date: string = new Date().toISOString().split('T')[0];
  qrData: string = '';
  attendanceList: Student[] = [];
  sessionId: string = '';

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.generateQRCode();
    this.simulateAttendance(); 
  }

  generateQRCode() {
    this.sessionId = Math.random().toString(36).substring(2, 15);
    this.qrData = `https://yourapp.com/attendance?session=${this.sessionId}`;
  }

  // Simula recibir asistencia
  simulateAttendance() {
    const mockStudents = [
      'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Ross',
      'Ethan Hunt', 'Fiona Apple', 'George Michael', 'Hannah Montana'
    ];

    const interval = setInterval(() => {
      if (this.attendanceList.length < mockStudents.length) {
        const newStudent: Student = {
          id: Math.random().toString(36).substring(2, 15),
          name: mockStudents[this.attendanceList.length],
          checkInTime: new Date()
        };
        this.attendanceList = [...this.attendanceList, newStudent];
      } else {
        clearInterval(interval);
      }
    }, 3000); //tiempo de cuando agrega a un estudiante(simulación)
  }

  async endAttendance() {
    const alert = await this.alertController.create({
      header: 'Terminar sesión de asistencia',
      message: 'Estás seguro que quieres hacer terminar la sesión de asistencia?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'End Session',
          handler: () => {
            console.log('Sesión de asistencia terminada');
            console.log('Class:', this.className);
            console.log('Date:', this.date);
            console.log('Attendance:', this.attendanceList);
            
          }
        }
      ]
    });

    await alert.present();
  }
}