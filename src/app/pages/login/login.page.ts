import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
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
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}


  generarUsuarios() {
    this.authService.createRandomUsers().subscribe(
      (response) => {
        const users = response.results;
        let profesoresGenerados = 0;
        let alumnosGenerados = 0;
  
        users.forEach((user: any, index: number) => {
          setTimeout(() => {
            let tipoUsuario: string = '';  // Inicializar con un valor por defecto
  
            // Alternar entre profesor y alumno hasta que se generen 5 de cada tipo
            if (profesoresGenerados < 5) {
              tipoUsuario = 'profesor';
              profesoresGenerados++;
            } else if (alumnosGenerados < 5) {
              tipoUsuario = 'alumno';
              alumnosGenerados++;
            } else {
              console.error('Se han generado suficientes profesores y alumnos');
              return; // Evitar que continúe si ambos límites han sido alcanzados
            }
  
            // Formatear el correo según el tipo de usuario
            const email = `${user.name.first}.${user.name.last}@${tipoUsuario}.cl`;
  
            const usuario: Usuario = {
              name: user.name.first + ' ' + user.name.last,
              email: email,
              pass: '123456',
              tipo: tipoUsuario,
            };
  
            this.authService.registerUser(usuario).then(() => {
              console.log(`Usuario ${usuario.email} creado exitosamente`);
            }).catch(error => {
              console.error('Error al registrar el usuario:', error);
            });
          }, index * 2000);
        });
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
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
      // Intento de autenticación con Firebase Authentication
      const usuarioLogeado = await this.authService.login(email, pass);

      if (usuarioLogeado.user) {
        // Consulta del usuario desde Firestore usando el UID
        const usuario = await this.firestore.collection('usuarios').doc(usuarioLogeado.user.uid).get().toPromise();
        const userData = usuario?.data() as Usuario;

        await loading.dismiss();

        // Redirigir según el tipo de usuario
        if (userData.tipo === 'profesor') {
          this.router.navigate(['/profesor']);
        } else if (userData.tipo === 'alumno') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/admin']); // Para otros casos si es necesario
        }
      }
    } catch (error) {
      await loading.dismiss();
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        title: "Error!",
        text: "Error en las credenciales, intente nuevamente!",
        icon: "error",
        confirmButtonText: "OK",
        heightAuto: false
      });

      this.loginForm.reset(); // Reiniciar el formulario
    }
  }
}
