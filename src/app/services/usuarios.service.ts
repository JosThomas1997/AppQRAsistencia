import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private collectionName = 'usuarios';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth 
  ) {}

 
  getUsuarios(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>(this.collectionName).valueChanges();
  }


  getAlumnos(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>(this.collectionName, ref => ref.where('tipo', '==', 'alumno')).valueChanges();
  }

 
  getCurrentUser(): Observable<Usuario | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
     
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


  getUsuarioByEmail(email: string): Observable<Usuario | undefined> {
    return this.firestore.collection<Usuario>(this.collectionName, ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map((usuarios: Usuario[]) => usuarios.length > 0 ? usuarios[0] : undefined)
      );
  }

 
  addUsuario(usuario: Usuario): Promise<void> {
    const id = this.firestore.createId(); 
    return this.firestore.collection(this.collectionName).doc(id).set(usuario);
  }


  updateUsuario(id: string, updatedUsuario: Usuario): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(updatedUsuario);
  }


  deleteUsuario(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}