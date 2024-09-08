import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-passreco',
  templateUrl: './passreco.page.html',
  styleUrls: ['./passreco.page.scss'],
})
export class PassrecoPage implements OnInit {

  resetForm: FormGroup;
  emailValue: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private alertController: AlertController // Inyecta AlertController
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: 'El mensaje de recuperación fue enviado a tu correo.',
      buttons: ['OK']
    });

    await alert.present();
    
    // Navega a la página de login después de que se cierre la alerta
    alert.onDidDismiss().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
