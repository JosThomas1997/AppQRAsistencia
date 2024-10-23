import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Clase } from 'src/app/interfaces/clase';
import { Horario } from 'src/app/interfaces/horario';


@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Obtener el horario de un profesor por su ID
  getHorarioProfesor(profesorId: string): Observable<Horario[]> {
    return this.firestore.collection<Horario>('horarios', ref =>
      ref.where('profesorId', '==', profesorId)).valueChanges();
  }

  // Obtener el horario de un alumno por su ID
  getHorarioAlumno(alumnoId: string): Observable<Horario[]> {
    return this.firestore.collection<Horario>('horarios', ref =>
      ref.where('alumnoId', '==', alumnoId)).valueChanges();
  }

  // Agregar o actualizar un horario
  addOrUpdateHorario(horario: Horario) {
    return this.firestore.collection('horarios').doc(horario.id).set(horario);
  }

  getClasesPorDia(dia: string): Observable<Clase[]> {
    return this.firestore.collection<Clase>('clases', ref => ref.where('dia', '==', dia)).valueChanges();
  }
}

