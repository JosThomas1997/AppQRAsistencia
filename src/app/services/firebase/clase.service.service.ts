import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/interfaces/clase.js';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Obtener todas las clases
  getClases(): Observable<Clase[]> {
    return this.firestore.collection<Clase>('clases').valueChanges();
  }

  // Agregar o actualizar una clase
  addOrUpdateClase(clase: Clase) {
    return this.firestore.collection('clases').doc(clase.id).set(clase);
  }

  // Eliminar una clase
  deleteClase(claseId: string) {
    return this.firestore.collection('clases').doc(claseId).delete();
  }
}
