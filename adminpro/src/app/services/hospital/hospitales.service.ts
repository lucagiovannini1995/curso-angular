import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { deepStrictEqual } from 'assert';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {



  
  constructor(public http: HttpClient, public usuario_serv: UsuarioService) {
    
  }

  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + '/hospitales?desde=' + desde;
    return this.http.get(url);

  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospitales/' + id;

    return this.http.get(url)
    .pipe(
      map( (resp: any) => resp.hospital)
    );

  }

  borrarHospital(	id:	string ) {
    let url = URL_SERVICIOS + '/hospitales/' + id;
    url += '?token=' + this.usuario_serv.token;

    return this.http.delete( url )
    .pipe( map( resp => {
      Swal.fire('Hospital borrado', 'El HOspital a sido borrado correctamente', 'success');
      return true;
    }));
  }

  crearHospital(	nombre:	string	) {
 
    let url = URL_SERVICIOS + '/hospitales';
    url += '?token=' + this.usuario_serv.token;
    return this.http.post(url, {nombre})
            .pipe(
              map ((resp: any) => {
                Swal.fire('Hospital creado', nombre, 'success');
                return resp.hospital;
              })
               );

  }

  buscarHospital(	termino:	string	) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
    .pipe(
      map ((resp: any) => resp.hospitales)
       );
  }



  actualizarHospital(hospital: Hospital) {

    console.log(hospital);
    let url = URL_SERVICIOS + '/hospitales/' + hospital._id;

    url += '?token=' + this.usuario_serv.token;
    console.log( url );

    return this.http.put( url, hospital )
                .pipe(map( (resp: any) => {
                   Swal.fire('Hospital actualizado', hospital.nombre, 'success');

                   return resp.hospital;
                }));
   }
}
