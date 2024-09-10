import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userName: string | null = '';

  constructor(private router: Router) { }

  ngOnInit() { 
    this.userName = localStorage.getItem('nombre');
  }

  navigateHorario() {
    this.router.navigate(['/horarios']);
  }

  logout(){
    localStorage.removeItem('nombre');
    this.router.navigate(['/login']);
  }

}
