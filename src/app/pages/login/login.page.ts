import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(private router: Router, private formBuilder:FormBuilder, private alertController:AlertController, private loadingController:LoadingController) {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass : ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  loginForm: FormGroup;
  emailValue?: string;
  passValue?: string;


  ngOnInit() {
  }

  async login () {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration : 200
    });


    const email = this.emailValue;
  const pass = this.passValue;
  if (email == '1' && pass== '1'){
    await loading.present();
    localStorage.setItem('usuarioLogin',email);
    setTimeout(async() => {
      await loading.dismiss();
      this.router.navigate(['home']);
    }, 2000)
    
  } else{
    const alert = await this.alertController.create({
      header: 'Acceso denegado',
      message: 'Usuario o contraseña incorrecta.',
      buttons: ['OK']
    });
    await alert.present();
    this.emailValue = '';
    this.passValue = '';
  }
  
 } 


  }


