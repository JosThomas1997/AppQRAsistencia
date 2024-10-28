import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private collectionName = 'asistencias';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}


  registrarAsistencia(asistencia: Asistencia): Promise<void> {
    return this.firestore.collection(this.collectionName).add(asistencia)
      .then(() => {
        console.log('Asistencia registrada correctamente.');
      })
      .catch(error => {
        console.error('Error al registrar la asistencia: ', error);
        throw error;
      });
  }


  getAsistenciaPorClase(claseId: string): Observable<Asistencia[]> {
    return this.firestore.collection<Asistencia>(this.collectionName, ref =>
      ref.where('claseId', '==', claseId)).snapshotChanges().pipe(
      map((actions: any[]) => actions.map(a => {
        const data = a.payload.doc.data() as Asistencia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  

 
  getAsistenciaPorAlumno(alumnoId: string): Observable<Asistencia[]> {
    return this.firestore.collection<Asistencia>(this.collectionName, ref =>
      ref.where('alumnoId', '==', alumnoId)).valueChanges();
  }

 
  updateAsistencia(id: string, updatedAsistencia: Partial<Asistencia>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedAsistencia)
      .then(() => {
        console.log('Asistencia actualizada correctamente.');
      })
      .catch(error => {
        console.error('Error al actualizar la asistencia: ', error);
        throw error;
      });
  }


  deleteAsistencia(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete()
      .then(() => {
        console.log('Asistencia eliminada correctamente.');
      })
      .catch(error => {
        console.error('Error al eliminar la asistencia: ', error);
        throw error;
      });
  }


  getAllAsistencias(): Observable<Asistencia[]> {
    return this.firestore.collection<Asistencia>(this.collectionName).valueChanges();
  }
}