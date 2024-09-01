import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  username: string = ''; 

  constructor(private router: Router){}

  navigateClases() {
    this.router.navigate(['/clases']);
  }

  navigateHorario() {
    this.router.navigate(['/horarios']);
  }

  navigateAsistencia() {
    this.router.navigate(['/asistencia']);
  }  

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
  }

  

}
