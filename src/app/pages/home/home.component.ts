import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { Juego } from '../../models/juego.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  copiedEmail: string | null = null;
  copiedPassword: string | null = null;

  copiedEmailAux: string | null = null;
  copiedPasswordAux: string | null = null;

  copyToClipboard(text: string): void {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = text.split(" ")[1];
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Update the state to show the tick icon
    if (text.startsWith('Correo:')) {
      this.copiedEmail = text;
      setTimeout(() => { this.copiedEmail = null; }, 1000); // Hide tick after 2 seconds
    } else if (text.startsWith('Contraseña:')) {
      this.copiedPassword = text;
      setTimeout(() => { this.copiedPassword = null; }, 1000); // Hide tick after 2 seconds
    } else if (text.startsWith('CorreoAux:')) {
      this.copiedEmailAux = text;
      setTimeout(() => { this.copiedEmailAux = null; }, 1000); // Hide tick after 2 seconds
    } else if (text.startsWith('ContraseñaAux:')) {
      this.copiedPasswordAux = text;
      setTimeout(() => { this.copiedPasswordAux = null; }, 1000); // Hide tick after 2 seconds
    }

  }


  //Firebase

  bdSvc = inject(FirestoreService);
  
  juegos!:Juego[];
  juegosFiltrados!:Juego[];

  txtBusqueda:string = "";

  constructor () {
    this.cargarJuegos();
  }

  cargarJuegos(): void {
    this.bdSvc.getDocuments("juegos").pipe(take(1)).subscribe((juegos: Juego[]) => {
      this.juegos = juegos;
      this.onBusquedaChange(this.txtBusqueda);
    });
  }

  ngOnInit(): void {
  }

  onBusquedaChange(event: string): void {
    this.txtBusqueda = event.toLowerCase();
    this.juegosFiltrados = this.juegos.filter( (juego:Juego) => {
      return juego.nombre.toLowerCase().includes(this.txtBusqueda);
    })
  }
}
