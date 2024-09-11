import { Component, OnInit } from '@angular/core';
import { EstudiantesService } from 'src/app/services/estudiantes.service';
import { UsuariosService } from 'src/app/services/usuarios.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asistencia: any;
  estudiantes: { nombre: string; presente: boolean; }[] = [];
  esProfesor: boolean = false;

  constructor(
    private estudiantesService: EstudiantesService,
    private usuariosService: UsuariosService // Inyecta el servicio de usuarios
  ) {}

  ngOnInit() {
    // Cargar la información de asistencia desde localStorage
    const record = localStorage.getItem('asistencia');
    if (record) {
      this.asistencia = JSON.parse(record);
    }

    // Obtener la lista de estudiantes desde el servicio
    this.estudiantes = this.estudiantesService.getEstudiantes();

    // Verificar el tipo de usuario
    this.verificarUsuario();
  }

  verificarUsuario() {
    const email = localStorage.getItem('userEmail'); // Obtén el email del usuario del localStorage
    if (email) {
      const usuario = this.usuariosService.getUsuarioByEmail(email);
      if (usuario && usuario.tipo === 'profesor') {
        this.esProfesor = true;
      }
    }
  }

  handleAdditionalInfo() {
    console.log('Ver Más button clicked');
  }
}