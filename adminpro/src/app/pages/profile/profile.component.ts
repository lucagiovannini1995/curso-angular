import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor( public usuService: UsuarioService) {
    this.usuario = this.usuService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google){
      this.usuario.email = usuario.email;
    }


    this.usuService.actualizarUsuario( this.usuario )
        .subscribe( resp => {

          console.log(resp);
        });
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
     this.imagenSubir = null;
     return;
    }

    if ( archivo.type.indexOf('imagen') < 0 ) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
    }

    this.imagenSubir = archivo;

    //para guargar temporalmente la imagen con js puro
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cambiarImagen() {
    this.usuService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
