import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { MensajesService } from 'src/app/services/mensajes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  emailValue: string = '';
  passValue: string = '';
  nomValue: string = '';

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,  
    private loadingController: LoadingController,
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private firestore : AngularFirestore,
    private mensajes : MensajesService

  ) {
    this.registerForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

 async register() {
    const nuevoUsuario: Usuario = {
      email: this.emailValue || '',
      pass: this.passValue || '',
      tipo: 'usuario',
      name: this.nomValue || ''
    }

   try {
    const usuarioFirebase = await this.authService.register(this.emailValue, this.passValue)
    const user= usuarioFirebase.user;

    if(user){
      await this.firestore.collection('usuarios').doc(user.uid).set({
        //Campos del formulario
        uid: user.uid,
        nombre: 'Nombre usuario',
        email: user.email,
        pass: this.passValue,
        tipo: 'profesor'
      });

      this.mensajes.mensaje('Cuenta creada exitosamente!','success','Éxito!').then(()=>{
        this.router.navigate(['/login']);
      })
      
    }
    this.router.navigate(['/login']);

   } catch (error) {
    this.mensajes.mensaje('Error al crear la cuenta, intente de nuevo!','error', 'Error!')
    
   }

  }

}
