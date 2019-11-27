import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementor',
  templateUrl: './incrementor.component.html',
  styles: []
})
export class IncrementorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
 // tslint:disable-next-line: no-input-rename
 @Input('nombre') leyenda: string = 'Leyenda';
 @Input()  progreso: number = 50;

 @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0) {
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit( this.progreso);
  }

  onChanges(num: number) {

    if ( num >= 100) {
      this.progreso = 100;
    } else if ( num <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = num;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
