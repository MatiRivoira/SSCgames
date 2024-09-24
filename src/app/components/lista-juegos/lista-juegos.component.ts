import { Component, Input } from '@angular/core';
import { Juego } from '../../models/juego.model';
import { FirestoreService } from '../../services/firestore.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { SweetAlertService } from '../../services/sweetAlert.service';

@Component({
  selector: 'app-lista-juegos',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent {
  juegos!: Juego[];
  isLoading: boolean = true;

  @Input() reload!:boolean; 

  constructor(
    private bdSvc: FirestoreService,
    private swAlert: SweetAlertService
  ) {
    this.cargarJuegos();
  }

  // Nueva función para cargar los juegos
  cargarJuegos(): void {
    this.isLoading = true; // Mostrar el loading mientras carga
    this.bdSvc.getDocuments("juegos").pipe(take(1)).subscribe((juegos: Juego[]) => {
      this.juegos = juegos;
      this.isLoading = false; // Ocultar el loading cuando termine
    });
  }

  borrarJuego(juego: Juego): void {
    this.swAlert.showDeleteConfirmation('¿Estás seguro?', 'Este juego será eliminado permanentemente.')
      .then((result: any) => {
        if (result.isConfirmed) {
          this.isLoading = true; // Mostrar el loading mientras se elimina
          this.bdSvc.deleteDocument("juegos", juego.id)
            .then(() => {
              this.swAlert.showCompletionAlert('El juego ha sido eliminado con éxito.');
              this.cargarJuegos(); // Vuelve a cargar la lista de juegos después de eliminar
            })
            .catch(err => {
              this.swAlert.showErrorAlert('Ocurrió un error al eliminar el juego.', 'Error');
            })
            .finally(() => {
              this.isLoading = false; // Ocultar el loading
            });
        } else {
          console.log('Acción cancelada');
        }
      });
  }
}
