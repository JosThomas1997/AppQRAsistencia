import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuController, AlertController } from '@ionic/angular';
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
    private firestore: AngularFirestore

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


  eliminarUsuario(email: string) {
    this.usuariosServices.deleteUsuario(email);
    this.config(); 
  }

 
  async editarUsuario(email: string) {
    const usuario = this.usuariosServices.getUsuarioByEmail(email);

    const alert = await this.alertCtrl.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: usuario?.name,
          placeholder: 'Nombre'
        },
        {
          name: 'email',
          type: 'text',
          value: usuario?.email,
          placeholder: 'Correo electrónico'
        },
        {
          name: 'pass',
          type: 'password',
          value: usuario?.pass,
          placeholder: 'Contraseña'
        },
        {
          name: 'tipo',
          type: 'text',
          value: usuario?.tipo,
          placeholder: 'Tipo de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedUsuario: Usuario = {
              email: data.email,
              pass: data.pass,
              tipo: data.tipo,
              name: data.name
            };
            this.usuariosServices.updateUsuario(email, updatedUsuario);
            this.config();  
          }
        }
      ]
    });

    await alert.present();
  }

}
