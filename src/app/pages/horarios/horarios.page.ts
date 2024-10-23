import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HorarioService } from 'src/app/services/firebase/horario.service.service'; // Importar el servicio
import { Clase } from 'src/app/interfaces/clase';
import { Observable, of } from 'rxjs'; // Importar 'of' de rxjs

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {
  diaDefault: string = 'lunes'; 
  clases$: Observable<Clase[]> = of([]); // Inicializar como un Observable vacío

  constructor(
    private router: Router,
    private alertController: AlertController,
    private horarioService: HorarioService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.getClases(); // Llamamos la función que obtiene las clases
  }

  // Obtener clases por el día seleccionado
  getClases() {
    this.clases$ = this.horarioService.getClasesPorDia(this.diaDefault);
  }

  onDayChange(event: any) {
    this.diaDefault = event.detail.value;
    this.getClases(); // Volvemos a cargar las clases para el nuevo día
  }

  async selectClass(clase: Clase) {
    const alert = await this.alertController.create({
      header: 'Generar Código QR',
      message: `¿Deseas generar un código QR para la clase ${clase.materia}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.generateQRCode(clase);
          },
        },
      ],
    });

    await alert.present();
  }

  generateQRCode(clase: Clase) {
    alert(`Código QR generado para la clase ${clase.materia}`);
  }
}
