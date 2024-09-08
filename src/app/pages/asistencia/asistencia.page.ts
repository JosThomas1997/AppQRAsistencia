import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencia: any;

  constructor() { }

  ngOnInit() {
    // Cargar la información de asistencia desde localStorage
    const record = localStorage.getItem('asistencia');
    if (record) {
      this.asistencia = JSON.parse(record);
    }
  }
}
