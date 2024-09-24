import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AltaJuegoComponent } from '../../components/alta-juego/alta-juego.component';
import { ListaJuegosComponent } from '../../components/lista-juegos/lista-juegos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../auth/login/login.component';
import { FirestoreService } from '../../services/firestore.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AltaJuegoComponent, ListaJuegosComponent, NavbarComponent, CommonModule, LoginComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild('list') listaJuegos!: ListaJuegosComponent;
  isAuthenticated: boolean = false; // Variable para verificar autenticación
  isLoading: boolean = true; // Variable para el loading

  authSvc = inject(AuthService);
  router = inject(Router);
  bdSvc = inject(FirestoreService);
  user$: any;

  ngOnInit(): void {
    this.user$ = this.authSvc.getUser();

    // Verificar si el usuario está autenticado
    this.user$.subscribe((user: any | null) => {
      console.log('Usuario autenticado:', user);
      if (user) {
        this.bdSvc.getDocument("users", user.uid).pipe(take(1)).subscribe(userBD => {
          if (userBD && userBD.userType) {
            this.isAuthenticated = (userBD.userType === "admin");
            if (!this.isAuthenticated) {
              this.router.navigateByUrl('/home'); // Redirigir si no es admin
            }
          } else {
            // Si el usuario no se encuentra en la base de datos
            console.warn('Usuario no encontrado en Firestore');
            this.router.navigateByUrl('/home');
          }
        });
      } else {
        // Si no hay usuario, redirigir a login
        console.warn('No hay usuario autenticado');
        this.router.navigateByUrl('/login');
      }
    });
}


  onJuegoAdded() {
    this.listaJuegos.cargarJuegos();  // Ejecutar la función del componente lista-juegos
  }
}
