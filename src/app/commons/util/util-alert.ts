import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilAlert {
  errorSwal(mensaje: string) {
    Swal.fire({
      title: 'Error',
      type: 'error',
      html: mensaje
    });
  }


  errorSwalTopRight(mensaje: string) {
    Swal.fire({
      timer: 2000,
      position: 'top-end',
      type: 'error',
      html: mensaje,
      showConfirmButton: false,
    });
  }

  warningSwal(mensaje: string) {
    Swal.fire({
      type: 'warning',
      html: mensaje
    });
  }

  successSwal(mensaje: string) {
    Swal.fire({
      title: 'Hecho!',
      type: 'success',
      html: mensaje
    });
  }
}
