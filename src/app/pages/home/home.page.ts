import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('nombre');
  }

  navigateClases() {
    this.router.navigate(['/clases']);
  }

  navigateHorario() {
    this.router.navigate(['/horarios']);
  }

  navigateAsistencia() {
    this.router.navigate(['/asistencia']);
  }

  logout() {
    localStorage.removeItem('nombre'); // Elimina el nombre del localStorage
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
