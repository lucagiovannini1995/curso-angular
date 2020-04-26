import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {


  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegis: number = 0;
  cargando: boolean;

  constructor( public usuService: UsuarioService, public modalUpload_Serv: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUpload_Serv.notificacion
            .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this.modalUpload_Serv.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuService.cargarUsuarios( this.desde )
          .subscribe( (resp: any) => {

            this.totalRegis = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
          });
  }

   cambiarDesde(valor: number ) {

    const desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.totalRegis) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde = desde;
    this.cargarUsuarios();

   }

   BucarUsuario( termino: string) {
    console.log(termino);

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this.usuService.buscarUsuarios( termino )
              .subscribe( (usuarios: Usuario[]) => {

                console.log( usuarios );
                this.usuarios = usuarios;
                this.cargando = false;
              });
   }

   borrarUsuario(usuario: Usuario) {

    if ( usuario._id === this.usuService.usuario._id) {
      Swal.fire( 'No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }


    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then(result => {

      console.log( result );

      if (result.value) {

        this.usuService.borrarUsuario( usuario._id )
                  .subscribe( resp => {
                    console.log(resp);
                    this.cargarUsuarios();
                  });
      }
    });

   }

   guardarUsuario( usua: Usuario) {


    console.log( usua );
    this.usuService.actualizarUsuario( usua )
      .subscribe();

   }
}
