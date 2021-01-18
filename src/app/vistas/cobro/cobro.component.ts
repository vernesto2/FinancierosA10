import { Component, OnInit } from '@angular/core';
import { CreditosService } from 'app/services/creditos.service';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit {

  mostrar = false;
  vercampos = true;
  cargando = false;
  listaCreditoPersonal: any[] = [];
  page = 1;

  efectivo: any;
  montoCancelar: any;
  cambio: any;
  fecha: Date;

  constructor(public serviceCP: CreditosService) { 
  }

  ngOnInit(): void { 
    this.iniciarFecha();
    this.llenarCreditoPersonal();
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

  llenarCreditoPersonal() {
    this.cargando = true;
    this.serviceCP.listaCreditoPersonaEnCurso().subscribe((res: any) => {
      this.listaCreditoPersonal = res.body;
      console.log(this.listaCreditoPersonal);
      this.cargando = false;
    });
  }
 
}
