import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { NativeBiometric } from 'capacitor-native-biometric';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor( 
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {

    setTimeout(() => {
      this.checkLogin();
      this.router.navigate(['login']);
    }, 2000);

  }

  async checkLogin(){
    this.authService.isLogged().subscribe(async(user)=>{
        if(user){
          try {
          // Verificacion con huella biometrica
          await this.checkHuellaDigital();
          
          const usuario = await this.firestore.collection('usuarios').doc
          (user.uid).get().toPromise();
          const userData = usuario?.data() as Usuario;
  
          if(userData){
            if(userData.tipo === 'admin'){
              this.router.navigate(['/admin-dashboard']);
            } else if (userData.tipo === 'usuario'){
              this.router.navigate(['/home']);
            }else{
              this.router.navigate(['/profesor']);
            }
          }
        } catch (error) {
          this.router.navigate(['login']);
        } 
      } else {
        this.router.navigate(['login']);
      }
    }); 
  }

  async checkHuellaDigital(){
    try {
      await NativeBiometric.verifyIdentity({
        reason: 'Por favor, autentificar para continuar',
        title: 'Autentificacion Biometrica',
        subtitle: 'Use su huella o Face ID',
        description: 'Coloque su huella en el sensor'
      });
    } catch (error){
      throw error;
    }
  }
}
