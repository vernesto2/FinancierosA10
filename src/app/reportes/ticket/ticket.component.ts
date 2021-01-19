import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  fecha = '';
  numCuota = '#';
  capital = '$';
  interes = '$';
  cuota = '$';
  capitalRestante = '$';
  montoEntregado = '$';
  cambio = '$';

  constructor() { }

  ngOnInit(): void {
    const dia = new Date().getDate(); //sacamos los dias actual
    const mes = new Date().getMonth(); // sacamos los meses actual
    const ano = new Date().getFullYear(); // sacamos el año actual
    const hora = new Date().getHours();
    const minuto = new Date().getMinutes();

    if (minuto < 10) {
      this.fecha = dia + '-' + mes + 1 + '-' + ano + ' ' + hora + ':' + '0' + minuto;
    } else {
      this.fecha = dia + '-' + mes + 1 + '-' + ano + ' ' + hora + ':' + minuto;
    }
  }

}
