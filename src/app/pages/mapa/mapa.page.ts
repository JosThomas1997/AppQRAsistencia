import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { latLng, tileLayer, marker, MapOptions, Marker } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage  {

   latitude: number = 0;  
  longitude: number = 0; 
  layers: Marker[] = [];
  options: MapOptions;
  error: string = '';  

  constructor() {

    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
          maxZoom: 18, 
          attribution: '© OpenStreetMap contributors' 
        })
      ],
      zoom: 15,
      center: latLng(0, 0) 
    };
  }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.options.center = latLng(this.latitude, this.longitude);
        this.layers = [ marker([this.latitude, this.longitude]) ];
      }, (error) => {
        this.error = 'Error al obtener la ubicación: ' + error.message;
        console.error('Error al obtener la ubicación:', error.message);
      });
    } else {
      this.error = 'Geolocalización no es soportada por este navegador.';
    }
  }
}