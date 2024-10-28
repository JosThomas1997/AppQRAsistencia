import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient } from '@angular/common/http'; // Añadir HttpClient
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://randomuser.me/api/'; 

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private http: HttpClient 
  ) { }

  

 
  createRandomUsers(): Observable<any> {
    const url = `${this.apiUrl}?results=10`; 
    return this.http.get(url);
  }

  registerUser(user: Usuario): Promise<void> {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      console.error('Correo inválido:', user.email);
      return Promise.reject('El formato del correo es inválido');
    }

    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.pass)
      .then((credentials) => {

        const uid = credentials.user?.uid;
        if (uid) {
          return this.firestore.collection('usuarios').doc(uid).set(user);
        } else {
          return Promise.reject('No se pudo obtener el UID del usuario');
        }
      })
      .catch((error) => {
        console.error('Error al registrar el usuario:', error);
        throw error;
      });
  }

  login (email: string, pass: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, pass);
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  register(email: string, pass: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pass);
  }

  logout() {
    return this.angularFireAuth.signOut();
  }

  recoveryPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Correo enviado!');
      })
      .catch((error) => {
        console.log('Error al enviar correo de recuperación');
        throw error;
      });
  }
}