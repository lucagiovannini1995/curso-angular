import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

constructor(
  public usuario_serv: UsuarioService
  ) {}

    canActivate() {

      if ( this.usuario_serv.usuario.role === 'ADMIN_ROLE' ) {
        return true;
      } else {
        console.log( 'BLoqueado por el ADMIN GUARD' );
        this.usuario_serv.logout();
        return false;
      }

    }


}
