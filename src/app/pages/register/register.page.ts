import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  emailValue?: string;
  passValue?: string;
  nomValue?: string;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private usuariosService: UsuariosService
  ) {
    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

  register() {
    const nuevoUsuario: Usuario = {
      email: this.emailValue || '',
      pass: this.passValue || '',
      tipo: 'usuario',
      name: this.nomValue || ''
    }
    // APLICAR ALERT o LOADING, pongale cariño
    this.usuariosService.addUsuario(nuevoUsuario);
    this.router.navigate(['/login']);
  }

}
