import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;
  hospitales: Hospital [];
  desde: number = 0;

  totalRegis: number = 0;

  // tslint:disable-next-line: variable-name
  constructor( public hospitales_serv: HospitalesService, public modalUpload_serv: ModalUploadService) { 

    this.modalUpload_serv.notificacion
            .subscribe( resp => this.cargarHospitales() );
  }

  ngOnInit() {
    this.cargarHospitales();
  }


  cargarHospitales() {

    this.cargando = true;
    this.hospitales_serv.cargarHospitales(this.desde)
              .subscribe( (resp: any) => {
                  console.log(resp);
                  this.hospitales = resp.hospitales;
                  this.totalRegis = resp.total;
                  this.cargando = false;

              });

  }

  bucarHospital(nombre: string) {

    if (nombre.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this.hospitales_serv.buscarHospital(nombre)
              .subscribe( (hosp: Hospital[]) => {
                this.hospitales = hosp;
                console.log(hosp);
                this.cargando = false;
              });
  }

  cambiarDesde( desde: number ) {

    if ( this.desde > 0) {

      this.desde += desde;
      this.cargarHospitales();
    }
  }

  guardarHospital( hospital: Hospital ) {
    this.hospitales_serv.actualizarHospital(hospital)
            .subscribe();
  }

  borrarHospital( hospital: Hospital ) {

    this.hospitales_serv.borrarHospital( hospital._id )
            .subscribe( () => this.cargarHospitales());
  }


  async crearHospital() {

    const nombre = await Swal.fire({
      title: 'Ingrese el nuevo hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe escrbir algo..';
        }
      }
    });

    if (nombre) {
      this.hospitales_serv.crearHospital(nombre.value)
      .subscribe(() => {
        this.cargarHospitales();
      });
    }
  }

  actualizarImagen( id: string ) {

    this.modalUpload_serv.mostrarModal('hospitales', id );
  }

}
