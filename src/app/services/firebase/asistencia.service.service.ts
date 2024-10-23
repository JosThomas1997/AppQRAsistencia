import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/interfaces/asistencia';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Registrar asistencia
   registrarAsistencia(asistencia: Asistencia): Promise<void> {
    // Crear un nuevo documento en la colección 'asistencias'
    return this.firestore.collection('asistencias').add(asistencia)
      .then(() => {
        console.log('Asistencia registrada correctamente.');
      })
      .catch(error => {
        console.error('Error al registrar la asistencia: ', error);
        throw error; // Lanza el error para manejarlo en el componente
      });
  }
  // Obtener la asistencia de una clase por su ID
  getAsistenciaPorClase(claseId: string): Observable<Asistencia[]> {
    return this.firestore.collection<Asistencia>('asistencias', ref =>
      ref.where('claseId', '==', claseId)).valueChanges();
  }

  // Obtener la asistencia de un alumno por su ID
  getAsistenciaPorAlumno(alumnoId: string): Observable<Asistencia[]> {
    return this.firestore.collection<Asistencia>('asistencias', ref =>
      ref.where('alumnoId', '==', alumnoId)).valueChanges();
  }
}
