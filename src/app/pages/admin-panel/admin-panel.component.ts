import { Component, ViewChild } from '@angular/core';
import { AltaJuegoComponent } from '../../components/alta-juego/alta-juego.component';
import { ListaJuegosComponent } from '../../components/lista-juegos/lista-juegos.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [AltaJuegoComponent, ListaJuegosComponent, NavbarComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  @ViewChild('list') listaJuegos!: ListaJuegosComponent;

  onJuegoAdded() {
    this.listaJuegos.cargarJuegos();  // Ejecutar la función del componente lista-juegos
  }
}
