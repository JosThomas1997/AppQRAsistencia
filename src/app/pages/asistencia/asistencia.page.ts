import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  className: string = 'Matemáticas';
  currentDate: Date = new Date();
  attendancePercentage: number = 75; // Ejemplo de porcentaje de asistencia

  constructor() { }

  ngOnInit() {
  }

}
