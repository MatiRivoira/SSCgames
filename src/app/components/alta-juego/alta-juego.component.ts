import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Juego } from '../../models/juego.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-alta-juego',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alta-juego.component.html',
  styleUrl: './alta-juego.component.scss'
})
export class AltaJuegoComponent {
  juegoForm: FormGroup;

  constructor(private fb: FormBuilder, private bdSvc: FirestoreService) {
    this.juegoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      img: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contraseña: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      correoAux: [''],
      contraseñaAux: ['']
    });
  }

  agregarJuego() {
    if (this.juegoForm.valid) {
      const nuevoJuego: Juego = this.juegoForm.value;
      this.bdSvc.addDocument("juegos", nuevoJuego).then(() => {
        console.log('Juego agregado con éxito' + nuevoJuego.nombre);
        this.juegoForm.reset();
      }).catch((error:any) => {
        console.error('Error al agregar el juego:', error);
      });
    }
  }
}
