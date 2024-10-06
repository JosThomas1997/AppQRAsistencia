import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  usuarios: any = [];

  constructor(
    private menuController: MenuController,
    private usuariosServices: UsuariosService,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private firestore: AngularFirestore,
    private router: Router

  ) { }

  ngOnInit() {
    this.menuController.enable(true);
    this.config();
  }

  config() {
    this.firestore.collection('usuarios').valueChanges().subscribe(aux => {
    this.usuarios = aux;

    })
  }

  //navegar otra pag envio uid user
  editarUser(uid:string){
    this.router.navigate(['/edit-user', uid]);

  }


  eliminarUsuario(email: string) {
    this.usuariosServices.deleteUsuario(email);
    this.config(); 
  }

  
  
}
