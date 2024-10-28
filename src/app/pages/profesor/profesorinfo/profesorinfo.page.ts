import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesorinfo',
  templateUrl: './profesorinfo.page.html',
  styleUrls: ['./profesorinfo.page.scss'],
})
export class ProfesorinfoPage implements OnInit {

  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.getCurrentUser().subscribe(user => {
      this.usuario = user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}