import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private estudiantes = [
    { nombre: 'Juan Pérez', presente: true },
    { nombre: 'María Gómez', presente: false },
    { nombre: 'Carlos López', presente: true },
    { nombre: 'Ana Martínez', presente: false },
    { nombre: 'Luis Torres', presente: true },
  ];

  constructor() { }

  getEstudiantes() {
    return this.estudiantes;
  }

}
