import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { container } from '@angular/core/src/render3';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  subscription: Subscription;

  constructor() {

    this.subscription = this.devolverObservable()
      .subscribe(
      numero => console.log('Subs ' + numero),
      error => console.error('Error en el obser ', error),
      () => console.log('El observador termino!')
      );
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('pagina cerrada');
    this.subscription.unsubscribe();
  }


  devolverObservable(): Observable<any> {
    return new Observable(observer => {

      let cont = 0;

      let interval = setInterval(() => {
        cont += 1;
        const val = {
          valor: cont
        };
        observer.next(val);
/*
        if ( cont === 3 ) {
          clearInterval(interval);
          observer.complete();
        }*/
       /* if ( cont === 2) {
          observer.error('rompiendo');
        }*/
      }, 1000);

    }).pipe(
      map ((resp: any) => resp.valor),

        filter((val,i) => {
          if ( (val % 2) === 1 ) {
            return true;
          } else { return false; }
        })
    );

  }

}
