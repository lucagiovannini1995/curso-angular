import { Injectable } from '@angular/core';
import { parse } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl : 'assets/css/colors/default.css',
    color : 'default'
  };
  constructor() {
    this.cargarAjustes();
  }


  guardarAjustes() {
    console.log('guardado en localStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

      console.log('localStorge cargado.');
      this.aplicarTema(this.ajustes.color);
    } else {
      console.log('usando valores por defecto');
    }
  }

  aplicarTema(color: string ) {
    const url: string = `assets/css/colors/${color}.css`;
    document.getElementById('tema').setAttribute('href', url);

    this.ajustes.color = color;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }


}


interface Ajustes {
  temaUrl: string;
  color: string;
}
