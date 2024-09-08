import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  emailValue?: string;
  passValue?: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private usuariosService: UsuariosService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    
  }

  

  async login() {
    // Comenté  la parte de `setTimeout` pa depurar porque el loading me quedó infinito xd
     const loading = await this.loadingController.create({
       message: 'Cargando.....',
       duration: 2000
     });
     await loading.present();

    const email = this.emailValue;
    const pass = this.passValue;

    // BUSCAMOS AL USUARIO EN LA BD
  
    const usuarios = await this.usuariosService.getUsuarios();
    const user = usuarios.find(u => u.email === email && u.pass === pass);

    if (user) {
      // Comenté  la parte de `setTimeout` pa depurar porque el loading me quedó infinito xd
       setTimeout(async () => {
         await loading.dismiss();
         localStorage.setItem('nombre', user.name);

        if (user.tipo === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (user.tipo === 'usuario') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/invitado-dashboard']);
        }
       }, 2000);
    } else {
      const alert = await this.alertController.create({
        header: 'Acceso denegado',
        message: 'Usuario o contraseña incorrecta.',
        buttons: ['OK']
      });
      await alert.present();
      this.emailValue = '';
      this.passValue = '';
    }
   
    // cierre del loadingController
     await loading.dismiss();
  }
}
