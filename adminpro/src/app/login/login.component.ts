import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import {Usuario} from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor( public router: Router, public usuService: UsuarioService) { }

  ngOnInit() {

    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }


  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '12370307994-dag74e2tbiqd2jtdhhndkqp7rhr60fq0.apps.googleusercontent.com',
        cookiepolicy: 'sinlge_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser =>{
    //  let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;

    this.usuService.loginGoogle(token)
        .subscribe( () => window.location.href = '#/dashboard');
    });
  }


  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      console.log('no es valido');
      return;
    }
    console.log('va queriendo');
    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuService.login(usuario, forma.value.recuerdame)
    .subscribe( correcto => this.router.navigate(['/dashboard']));

  }
}
