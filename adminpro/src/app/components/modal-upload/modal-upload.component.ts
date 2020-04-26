import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


imagenSubir: File;
imagenTemp: string;

  constructor( public subirArcvhivo_serv: SubirArchivoService, public modalUpload_Serv: ModalUploadService) { }

  ngOnInit() {
  }


  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
     this.imagenSubir = null;
     return;
    }
console.log(archivo);

    if ( archivo.type.indexOf('imagen') < 0 ) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    }

    this.imagenSubir = archivo;

    //para guargar temporalmente la imagen con js puro
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirImagen() {

    this.subirArcvhivo_serv.subirArchivo( this.imagenSubir, this.modalUpload_Serv.tipo, this.modalUpload_Serv.id )
                  .then( resp => {

                    this.modalUpload_Serv.notificacion.emit( resp );
                    this.cerrarModal();
                  })
                  .catch( err => {
                    console.log( 'Error en la carga...' );
                  });

  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this.modalUpload_Serv.ocultarModal();

  }

}
