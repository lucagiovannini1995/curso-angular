import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(public usuService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.usuService.usuario;
  }

  buscar( termino: string ) {

    console.log(termino);
    this.router.navigate(['/busqueda', termino]);
  }

}
