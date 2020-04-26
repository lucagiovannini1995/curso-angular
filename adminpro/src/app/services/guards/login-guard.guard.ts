import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate  {


  constructor( public usuService: UsuarioService, public router: Router) {}


  canActivate() {

    if ( this.usuService.estaLogueado() ) {
     // console.log('Paso por login guards');
      return true;
    } else {
      console.log('Bloqueado por guards');
      this.router.navigate(['/login']);
      return false;
    }
  }
}


