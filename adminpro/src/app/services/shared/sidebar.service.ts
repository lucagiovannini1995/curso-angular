import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any;
/*
  menu: any = [
    {
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      { titulo: 'Dashboard', url: '/dashboard'},
      { titulo: 'ProgressBar', url: '/progress'},
      { titulo: 'Graficas', url: '/graficas1'},
      { titulo: 'Promesas', url: '/promesas'},
      { titulo: 'Rxjs', url: '/rxjs'}
    ]
    },
  {
    titulo: 'Manteniento',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      { titulo: 'Usuarios', url: '/usuarios'},
      { titulo: 'Hospitales', url: '/hospitales'},
      { titulo: 'Medicos', url: '/medicos'}
    ]
  }
  ];*/

  constructor(
    public usuario_serv: UsuarioService
  ) {
      }

   cargarMenu() {
    this. menu = this.usuario_serv.menu;
 
   }
}
