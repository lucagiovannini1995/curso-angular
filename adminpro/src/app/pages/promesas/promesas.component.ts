import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then((v) => {
      console.log('termino:' + v);
    });
    this.contarTres().catch((e) => {
      console.log(e);
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    let promesa: any = new Promise((resolve, reject) => {

      let cont = 0;

      let intervalo = setInterval(() => {

        cont += 1;
        console.log(cont);

        if ( cont === 3 ) {
            resolve(true);
            clearInterval(intervalo);
          }
      }, 1000);
    });
    return promesa;

  }

}
