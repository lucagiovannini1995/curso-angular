import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

//import swal from 'SweetAlert';
import Swal from 'sweetalert2';

// CommonJS

import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(public  usuario_Serv: UsuarioService, public router: Router) { }

  sonIguales( campo1: string, campo2: string ) {

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      cond: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'test',
      correo: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      cond: true

    });
  }


  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }
    if (! this.forma.get('cond').value) {
      Swal.fire('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    console.log('Forma valida:', this.forma.valid);
    console.log(this.forma.value);

    let usuario = new Usuario(
    this.forma.get('nombre').value,
    this.forma.get('correo').value,
    this.forma.get('password').value
    );

    this.usuario_Serv.crearUsuario(usuario)
    .subscribe(res => this.router.navigate(['/login']));
  }

}
