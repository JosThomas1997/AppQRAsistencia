import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [
    { 'email':'admin@admin.cl','pass':'admin123','tipo':'admin','name':''},
    { 'email':'user@user.cl','pass':'user123','tipo':'usuario','name':''},
    { 'email':'invi@invi.cl','pass':'invitado','tipo':'invitado','name':''},
  ]

  constructor() { }

  

  getUsuarios() {
    return this.usuarios;
  }

  getUsuarioByEmail() {

  }

  addUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  deleteUsuario() {

  }

  updateUsuario() {

  }

}
