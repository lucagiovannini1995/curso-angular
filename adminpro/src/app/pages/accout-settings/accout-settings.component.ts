import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(@Inject(SettingsService) public  setServ: SettingsService) {
  }

  ngOnInit() {
    this.colocarCheck();
  }


  cambiarColor(color: string, link) {
    console.log(link);

    this.aplicarCheck(link);

    this.setServ.aplicarTema(color);

  }

  aplicarCheck(link) {
     let selector: any = document.getElementsByClassName('selector');

     for (let r of selector) {
      r.classList.remove('working');
     }
     link.classList.add('working');
    }

    colocarCheck() {
      let selector: any = document.getElementsByClassName('selector');

      for (let ref of selector) {
       let color = this.setServ.ajustes.color;
       if (color === ref.getAttribute('data-theme')) {
            ref.classList.add('working');
          }
      }

    }
}
