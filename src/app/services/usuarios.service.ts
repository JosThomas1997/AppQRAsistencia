import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarios: Usuario[] = [
    { 'email': 'admin@admin.cl', 'pass': 'admin123', 'tipo': 'admin', 'name': 'admin' },
    { 'email': 'user@user.cl', 'pass': 'user123', 'tipo': 'usuario', 'name': '' },
    { 'email': 'profesor@duoc.cl', 'pass': 'profesor123', 'tipo': 'profesor', 'name': 'Profesor' },
  ];

  constructor() { }


  getUsuarios() {
    return this.usuarios;
  }

 
  getUsuarioByEmail(email: string): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.email === email);
  }


  addUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }


  deleteUsuario(email: string) {
    this.usuarios = this.usuarios.filter(usuario => usuario.email !== email);
  }


  updateUsuario(email: string, updatedUsuario: Usuario) {
    const index = this.usuarios.findIndex(usuario => usuario.email === email);
    if (index !== -1) {
      this.usuarios[index] = updatedUsuario;
    }
  }
}
