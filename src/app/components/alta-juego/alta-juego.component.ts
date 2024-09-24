import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Juego } from '../../models/juego.model';
import { CommonModule } from '@angular/common';
import { FireStorageService } from '../../services/firestorage.service';
import { LoadingComponent } from '../loading/loading.component';
import { SweetAlertService } from '../../services/sweetAlert.service';

@Component({
  selector: 'app-alta-juego',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoadingComponent],
  templateUrl: './alta-juego.component.html',
  styleUrl: './alta-juego.component.scss'
})
export class AltaJuegoComponent {
  juegoForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName:string = "";
  plataforma:string = "steam";
  isLoading:boolean = false;

  @Output() outFinish = new EventEmitter();

  constructor(private fb: FormBuilder, private bdSvc: FirestoreService, private fireStorageSvc: FireStorageService, private swAlert:SweetAlertService) {
    this.juegoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
      correoAux: [''],
      contraseñaAux: ['']
    });
  }

  // Evento para manejar la selección de archivo
  // Función para activar el input de archivo
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    fileInput.click();
  }

  // Función para manejar la selección de archivo
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;
    }
  }

  agregarJuego(): void {
    if (this.juegoForm.valid && this.selectedFile) {
      this.isLoading = true;
      const fileName = this.selectedFile.name;
      const folder = 'imagenes';

      // Usar el servicio para subir la imagen
      this.fireStorageSvc.uploadImage(folder, fileName, this.selectedFile).subscribe(
        (imgURL) => {
          // Cuando la imagen se sube, se agrega el juego con la URL de la imagen
          const nuevoJuego: Juego = {
            ...this.juegoForm.value,
            img: imgURL,
            plataforma: this.plataforma,
            fechaIngreso:  new Date()
          };
          this.bdSvc.addDocument("juegos", nuevoJuego).then(() => {
            console.log('Juego agregado con éxito' + nuevoJuego.nombre);
            this.juegoForm.reset();
            this.isLoading = false;
            this.swAlert.showCompletionAlert(nuevoJuego.nombre + " agregado con éxito");
            this.outFinish.emit();
          }).catch((error:any) => {
            console.error('Error al agregar el juego:', error);
            this.isLoading = false;
            this.outFinish.emit();
          });
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
          this.isLoading = false;
          this.outFinish.emit();
        }
      );
    }
  }
}
