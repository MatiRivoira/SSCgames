import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebase from 'firebase/compat/app';  // Asegúrate de importar desde firebase/compat/app

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(AngularFireAuth);
  router = inject(Router);
  firestore = inject(FirestoreService);

  private userSubject: BehaviorSubject<firebase.User | null> = new BehaviorSubject<firebase.User | null>(null);
  public user$: Observable<firebase.User | null> = this.userSubject.asObservable();

  constructor() {
    this.auth.authState.subscribe(user => {
      this.userSubject.next(user);
    });
  }

  getAuth() {
    return getAuth();
  }

  signIn(user: any): Promise<boolean | Error> {
    return this.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        if (userCredential.user && userCredential.user.emailVerified) {
          this.userSubject.next(userCredential.user); // Emitir el usuario autenticado
          return true;
        } else {
          throw false;
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        throw error;
      });
  }

  async signUp(user: any): Promise<boolean> {
    const userCredential = await this.auth.createUserWithEmailAndPassword(user.email, user.password);
    const uid = userCredential.user?.uid;

    // Agregar el usuario a Firestore
    await this.firestore.addDocument('users', user, uid);

    // Enviar el correo de verificación
    await userCredential.user?.sendEmailVerification();

    return true;
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  logOut(redirect: boolean = true) {
    this.auth.signOut().then(() => {
      if (redirect) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  getUser(): Observable<firebase.User | null> {
    return this.user$;
  }
}
