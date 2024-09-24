import { Component, inject } from '@angular/core';
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
export class HomeComponent{
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

  isLoading:boolean = false;

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

  onBusquedaChange(event: string): void {
    // Eliminar los espacios del término de búsqueda y convertir a minúsculas
    this.txtBusqueda = event.trim().toLowerCase().replace(/\s+/g, '');
  
    this.juegosFiltrados = this.juegos.filter((juego: Juego) => {
      // Eliminar los espacios del nombre del juego y convertir a minúsculas
      const nombreJuegoSinEspacios = juego.nombre.toLowerCase().replace(/\s+/g, '');
      return nombreJuegoSinEspacios.includes(this.txtBusqueda);
    });
  }
  
  
}
