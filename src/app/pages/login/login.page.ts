import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

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
    private usuariosService: UsuariosService,
    private authService : AuthService,
    private firestore : AngularFirestore
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    
  }

  

  async login() {
    const email = this.loginForm.value.email;
    const pass = this.loginForm.value.pass;
    
    const loading = await this.loadingController.create({
      message: 'Cargando....',
      duration: 2000
    });
    
    await loading.present();
  
    try {
      const usuarioLogeado = await this.authService.login(email, pass);
      
      if (usuarioLogeado.user) {
        const usuario = await this.firestore.collection('usuarios').doc(usuarioLogeado.user.uid).get().toPromise();
        const userData = usuario?.data() as Usuario;
  
        await loading.dismiss(); 
  
        if (userData.tipo === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (userData.tipo === 'usuario') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/profesor']);
        }
      }
    } catch (error) {
      await loading.dismiss();
      Swal.fire({
        title: "Error!",
        text: "Error en las credenciales, intentelo nuevamente!",
        icon: "error",
        confirmButtonText: "OK",
        heightAuto: false
      });
  
      this.loginForm.reset(); 
    }
  }

}  
