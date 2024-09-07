import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/interfaces/clase';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  //variable que recibe param
  
  clases = [
    {nombre: 'Arquitectura', fecha: '05-09-2024', hora: '10:00AM'}

  ];

  constructor(private router : Router) { }

  ngOnInit() {
    
  }

  verDetalleclases(aux:any){
    this.router.navigate(['detalle-clases', aux.nombre])
  }

}
