import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasesPorDia, Clase } from 'src/app/interfaces/clase';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  diaDefault: string = 'lunes'; // 

  clases: ClasesPorDia = {
    lunes: [
      { nombre: 'Arquitectura', bloques: [{ start: '10:00 AM', end: '11:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Matemáticas', bloques: [{ start: '8:00 AM', end: '9:30 AM' }, { start: '10:00 AM', end: '11:00 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    miércoles: [
      { nombre: 'Matemáticas', bloques: [{ start: '9:00 AM', end: '10:30 AM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' },
      { nombre: 'Programación Móvil', bloques: [{ start: '1:00 PM', end: '2:30 PM' }], imagen: 'assets/imgs/book-bookmark-svgrepo-com.png' }
    ],
    
  };

  constructor(private router: Router) { }

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
}
