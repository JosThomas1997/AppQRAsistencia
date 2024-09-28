import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private authService : AuthService
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

    

    // BUSCAMOS AL USUARIO EN LA BD
  
    /*const usuarios = await this.usuariosService.getUsuarios();
    const user = usuarios.find(u => u.email === email && u.pass === pass);
    */
    
    
     try{
    const email = this.emailValue;
    const pass = this.passValue;

    const usuarioFirebase = await this.authService.login(email as string, pass as string);
      
      if (usuarioFirebase.user) {

        // MOMENTANEAMENTE
        const tipo = 'admin' as string;
         setTimeout(async () => {
           await loading.dismiss();
           localStorage.setItem('usuarioLogin', email as string );
  
          if (tipo === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (tipo === 'usuario') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/profesor']);
          }
         }, 2000);
      } 
     } catch(error) {
      Swal.fire({
        title: "Error!",
        text: "Error en las credenciales, intentelo nuevamente!",
        icon: "error",
        confirmButtonText: "OK",
        heightAuto: false
      });

      this.emailValue = '';
      this.passValue = '';
    }
   
    // cierre del loadingController
     await loading.dismiss();
  }
}
