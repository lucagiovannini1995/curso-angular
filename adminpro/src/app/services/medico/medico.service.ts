import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http:HttpClient, public usuario_serv: UsuarioService) { }

  guardarMedico( medico: Medico) {

    console.log('es: ' +medico);
    let url = URL_SERVICIOS + '/medicos';

    if ( medico._id ) {
    //Actualizar
    url += '/' + medico._id;
    url += '?token=' + this.usuario_serv.token;
    return this.http.put( url, medico )
                .pipe( map( (resp: any) => {
                  Swal.fire('Medico Actualizado', medico.nombre, 'success');
                  return resp;
                }));
    } else {
        //Crear
        url += '?token=' + this.usuario_serv.token;

        return this.http.post( url, medico )
        .pipe( map( (resp: any) => {
          Swal.fire('Medico Creado', medico.nombre, 'success');
          return resp;
        })
        );
    }

  }
  cargarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medicos/' + id;

    return this.http.get( url )
    .pipe( map( (resp: any) => resp.medico ));
  }

}
