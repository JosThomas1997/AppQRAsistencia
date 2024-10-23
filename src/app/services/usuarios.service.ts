import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private collectionName = 'usuarios'; // Nombre de la colección en Firestore

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth // Inyectar AngularFireAuth para manejar la autenticación
  ) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>(this.collectionName).valueChanges();
  }

  // Obtener los alumnos (usuarios de tipo 'alumno')
  getAlumnos(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>(this.collectionName, ref => ref.where('tipo', '==', 'alumno')).valueChanges();
  }

  // Obtener el usuario actualmente logueado
  getCurrentUser(): Observable<Usuario | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Si el usuario está logueado, obtener su información desde Firestore
          return this.firestore.collection<Usuario>(this.collectionName, ref => ref.where('email', '==', user.email))
            .valueChanges()
            .pipe(
              map((usuarios: Usuario[]) => usuarios.length > 0 ? usuarios[0] : null)
            );
        } else {
          return new Observable<Usuario | null>(observer => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }

  // Obtener un usuario por su email
  getUsuarioByEmail(email: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>(this.collectionName, ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map((usuarios: Usuario[]) => usuarios.length > 0 ? usuarios[0] : undefined)
      );
  }

  // Agregar un nuevo usuario a Firestore
  addUsuario(usuario: Usuario): Promise<void> {
    const id = this.firestore.createId(); // Crear un ID único automáticamente
    return this.firestore.collection(this.collectionName).doc(id).set(usuario);
  }

  // Actualizar un usuario por su ID
  updateUsuario(id: string, updatedUsuario: Usuario): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedUsuario);
  }

  // Eliminar un usuario por su ID
  deleteUsuario(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}