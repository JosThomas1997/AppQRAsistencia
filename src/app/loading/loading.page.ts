import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/firebase/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';

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

    /*setTimeout(() => {
      this.checkLogin();
      //this.router.navigate(['login']);
    }, 2000);

  }

  async checkLogin(){
    this.authService.isLogged().subscribe(async(user)=>{
      if(user){
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
      } else {
        this.router.navigate(['login']);
      }
    });
    */
  }
}
