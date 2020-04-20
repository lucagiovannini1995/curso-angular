import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {


usuario: Usuario;
  constructor( public sidebarServ: SidebarService, public usuService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuService.usuario;
  }

}
