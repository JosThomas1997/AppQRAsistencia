import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AsistenciaService } from 'src/app/services/firebase/asistencia.service.service';

@Component({
  selector: 'app-estudianteinfo',
  templateUrl: './estudianteinfo.page.html',
  styleUrls: ['./estudianteinfo.page.scss'],
})
export class EstudianteinfoPage implements OnInit {

  usuario: Usuario | null = null;
  totalClases: number = 0;
  asistencias: number = 0;
  porcentajeAsistencia: string = '0%'; 

  constructor(
    private usuarioService: UsuarioService,
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.getCurrentUser().subscribe(user => {
      this.usuario = user;
      if (this.usuario) {
        this.cargarAsistencia(this.usuario);
      }
    });
  }

  cargarAsistencia(usuario: Usuario) {

    this.asistenciaService.getAsistenciaPorAlumno(usuario.email).subscribe(asistencias => {
      this.totalClases = asistencias.length; 
      this.asistencias = 0;


      asistencias.forEach(asistencia => {

        if (asistencia.estudiantes) {

          const estudiante = asistencia.estudiantes.find(est => est.id === usuario.email);
          if (estudiante && estudiante.estado === 'presente') {
            this.asistencias++;
          }
        }
      });

      if (this.totalClases > 0) {
        const porcentaje = (this.asistencias / this.totalClases) * 100;
        this.porcentajeAsistencia = `${porcentaje.toFixed(2)}% (${this.asistencias} de ${this.totalClases} clases)`;
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}