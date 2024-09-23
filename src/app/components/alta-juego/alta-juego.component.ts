import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Juego } from '../../models/juego.model';
import { CommonModule } from '@angular/common';
import { FireStorageService } from '../../services/firestorage.service';


@Component({
  selector: 'app-alta-juego',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alta-juego.component.html',
  styleUrl: './alta-juego.component.scss'
})
export class AltaJuegoComponent {
  juegoForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private bdSvc: FirestoreService, private fireStorageSvc: FireStorageService ) {
    this.juegoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      correoAux: [''],
      contraseñaAux: ['']
    });
  }

  // Evento para manejar la selección de archivo
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  agregarJuego(): void {
    if (this.juegoForm.valid && this.selectedFile) {
      const fileName = this.selectedFile.name;
      const folder = 'imagenes';

      // Usar el servicio para subir la imagen
      this.fireStorageSvc.uploadImage(folder, fileName, this.selectedFile).subscribe(
        (imgURL) => {
          // Cuando la imagen se sube, se agrega el juego con la URL de la imagen
          const nuevoJuego: Juego = {
            ...this.juegoForm.value,
            img: imgURL // Guardar la URL de la imagen en Firestore
          };
          this.bdSvc.addDocument("juegos", nuevoJuego).then(() => {
            console.log('Juego agregado con éxito' + nuevoJuego.nombre);
            this.juegoForm.reset();
          }).catch((error:any) => {
            console.error('Error al agregar el juego:', error);
          });
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }
}
