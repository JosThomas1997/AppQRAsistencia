import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { HttpClient } from '@angular/common/http'; // Añadir HttpClient


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://randomuser.me/api/'; // URL base de la API

  constructor(private angularFireAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private http: HttpClient // Inyectar HttpClient
  ) { }

  // Obtener 5000 usuarios y luego filtrar solo los 10 necesarios (5 profesores y 5 alumnos)
  createRandomUsers(): Observable<any> {
    const url = `${this.apiUrl}?results=5000`; // URL para obtener 5000 usuarios y seleccionar los necesarios
    return this.http.get(url);
  }

  // Registrar usuario en Firebase y en Firestore
  registerUser(user: Usuario): Promise<void> {
    return this.angularFireAuth.createUserWithEmailAndPassword(user.email, user.pass)
      .then((credentials) => {
        // Guardar el usuario en Firestore
        const uid = credentials.user?.uid;
        if (uid) {
          return this.firestore.collection('usuarios').doc(uid).set(user);
        } else {
          return Promise.reject('No se pudo obtener el UID del usuario');
        }
      });
  }

  login (email: string, pass: string){
    return this.angularFireAuth.signInWithEmailAndPassword(email,pass);
  }

  isLogged(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  register (email: string, pass: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, pass);
  }

  logout (){
    return this.angularFireAuth.signOut();
  }

  recoveryPassword (email: string){
    return this.angularFireAuth.sendPasswordResetEmail(email)
    .then (( ) => {
      console.log('Correo enviado!');
    })
    .catch((error) => {
      console.log('Error al enviar correo de recuperación');
      throw error;
    })
    
  }
}
