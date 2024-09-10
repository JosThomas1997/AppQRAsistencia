import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencia: any;
  
  // Especificar el tipo de estudiantes como un array de objetos con nombre y presente
  estudiantes: { nombre: string; presente: boolean; }[] = [];

  constructor(private estudiantesService: EstudiantesService) {}

  ngOnInit() {
    // Cargar la información de asistencia desde localStorage
    const record = localStorage.getItem('asistencia');
    if (record) {
      this.asistencia = JSON.parse(record);
    }

    // Obtener la lista de estudiantes desde el servicio
    this.estudiantes = this.estudiantesService.getEstudiantes();
  }

  handleAdditionalInfo() {
    console.log('Ver Más button clicked');
  }
}
