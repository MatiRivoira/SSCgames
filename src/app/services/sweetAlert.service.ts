import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccessAlert(mensaje: string, titulo: string, icono: SweetAlertIcon) {
    Swal.fire(titulo, mensaje, icono);
  }

  showErrorAlert(mensaje: string, titulo: string = 'Error') {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje
    });
  }

  showCompletionAlert(mensaje: string, titulo: string = 'Completado') {
    Swal.fire({
      icon: 'success',
      title: titulo,
      text: mensaje
    });
  }

  showAlert(titulo: string, mensaje: string, icono: SweetAlertIcon = 'warning') {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: mensaje
    });
  }

  showPrompt(title: string, inputPlaceholder: string): Promise<any> {
    return Swal.fire({
      title: title,
      input: 'text',
      inputPlaceholder: inputPlaceholder,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });
  }

  showDeleteConfirmation(titulo: string, mensaje: string): Promise<any> {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      return result;
    });
  }

}
