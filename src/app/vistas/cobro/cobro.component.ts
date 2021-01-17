import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit {

  mostrar = false;
  vercampos = true;

  efectivo: any;
  montoCancelar: any;
  cambio: any;
  fecha: Date;

  constructor() { 
  }

  ngOnInit(): void { 
    this.iniciarFecha();
  }

  mensaje() {
    console.log(this.mostrar);
  }

  habilitarMontos(value: number) {
    if (value == 2) {
      this.vercampos = false;
    } else {
      this.vercampos = true;
    }
  }

  calcularCambio(value: number) {
    this.montoCancelar = value;
    if (this.efectivo != null) {
      this.cambio = this.efectivo - this.montoCancelar;
    }
    
  }

  efectivoEstablecer(value: number) { 
    this.efectivo = value;
    if (this.montoCancelar != null) {
      this.cambio = this.efectivo - this.montoCancelar;
    }
  }

  iniciarFecha() {
    const dias = new Date().getDate(); //sacamos los dias actual
    const mes = new Date().getMonth(); // sacamos los meses actual
    const año = new Date().getFullYear(); // sacamos el año actual
    //const fecha = año + '-' + mes + 1 + '-' + dias + 1;

    this.fecha = new Date(año, mes, dias);
  }
}
