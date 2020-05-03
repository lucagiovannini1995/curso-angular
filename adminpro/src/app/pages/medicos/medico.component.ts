import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from '../../services/hospital/hospitales.service';
import { NgForm } from '@angular/forms';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  // tslint:disable-next-line: variable-name
  constructor( public medico_serv: MedicoService,
               public hospital_serv: HospitalesService,
               public router: Router,
               public activatedRoute: ActivatedRoute) {

                activatedRoute.params.subscribe( params => {
                   let id = params['id'];
                   if ( id !== 'nuevo' ) {
                     this.cargarMedico( id );
                   }
                 });
                }

  ngOnInit() {
    this.hospital_serv.cargarHospitales()
    .subscribe( (hospitales: any) => this.hospitales = hospitales.hospitales );
  }

  cargarMedico( id: string ) {

    this.medico_serv.cargarMedico( id )
            .subscribe( medico => {

               console.log(medico);
               this.medico = medico;
               this.medico.hospital = medico.hospital._id;
              });
  }

  gaurdarMedico(hospital: NgForm) {
    console.log(hospital.valid);
    console.log(hospital.value);
    console.log(this.medico);
    if ( hospital.invalid ) {
      return;
    }

    this.medico_serv.guardarMedico( this.medico )
              .subscribe( resp => {
                console.log(resp);
                this.medico = resp.Medico;
                this.router.navigate(['/medico', resp.Medico._id]);
              });
  }

  cambioHospital( id: string) {

    this.hospital_serv.obtenerHospital( id )
              .subscribe( (resp: any) => {
                  this.hospital = resp;
              });
    console.log( this.hospital );

  }

}
