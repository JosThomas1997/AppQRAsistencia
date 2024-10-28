import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsistenciaService } from 'src/app/services/firebase/asistencia.service.service';
import { Asistencia } from 'src/app/interfaces/asistencia';

@Component({
  selector: 'app-edit-asis',
  templateUrl: './edit-asis.page.html',
  styleUrls: ['./edit-asis.page.scss'],
})
export class EditAsisPage implements OnInit {

  asistenciaForm: FormGroup;
  asistencias: Asistencia[] = [];
  selectedAsistenciaId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private asistenciaService: AsistenciaService
  ) {
    this.asistenciaForm = this.formBuilder.group({
      claseId: ['', Validators.required],
      alumnoId: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadAsistencias();
  }


  loadAsistencias() {

    this.asistenciaService.getAsistenciaPorClase('claseId').subscribe(
      (asistencias) => {
        this.asistencias = asistencias;
      },
      (error) => {
        console.error('Error al cargar asistencias: ', error);
      }
    );
  }


  registrarAsistencia() {
    if (this.asistenciaForm.valid) {
      const asistencia: Asistencia = {
        ...this.asistenciaForm.value,
        fecha: new Date().toISOString(),
        estudiantes: [], 
      };
      this.asistenciaService.registrarAsistencia(asistencia).then(() => {
        console.log('Asistencia registrada correctamente.');
        this.loadAsistencias(); 
        this.asistenciaForm.reset();
      }).catch((error) => {
        console.error('Error al registrar la asistencia: ', error);
      });
    }
  }


  cargarAsistenciaParaEditar(asistencia: Asistencia, id: string) {
    this.selectedAsistenciaId = id;
    this.asistenciaForm.patchValue({
      claseId: asistencia.claseId,
      alumnoId: asistencia.alumnoId,
      estado: asistencia.estado,
    });
  }

  guardarAsistenciaEditada() {
    if (this.selectedAsistenciaId && this.asistenciaForm.valid) {
      this.asistenciaService.updateAsistencia(this.selectedAsistenciaId, this.asistenciaForm.value).then(() => {
        console.log('Asistencia actualizada correctamente.');
        this.loadAsistencias();
        this.asistenciaForm.reset();
        this.selectedAsistenciaId = null;
      }).catch((error) => {
        console.error('Error al actualizar la asistencia: ', error);
      });
    }
  }


  eliminarAsistencia(id: string) {
    this.asistenciaService.deleteAsistencia(id).then(() => {
      console.log('Asistencia eliminada correctamente.');
      this.loadAsistencias();
    }).catch((error) => {
      console.error('Error al eliminar la asistencia: ', error);
    });
  }
}