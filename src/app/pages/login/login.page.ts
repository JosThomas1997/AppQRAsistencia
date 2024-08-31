import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async login() {
    if (this.username === 'duoc' && this.password === 'duoc') {
      localStorage.setItem('username', this.username);
      this.router.navigateByUrl('/home');
    } else {
      const alert = await this.alertController.create({
        header:'ERROR',
        message: 'USUARIO O CONTRASEÑA INCORRECTA',
        buttons: ['Entendido']
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
