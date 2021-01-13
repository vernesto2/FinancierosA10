import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proyecciones',
  templateUrl: './proyecciones.component.html',
  styleUrls: ['./proyecciones.component.css']
})
export class ProyeccionesComponent implements OnInit {
  listaCuotas: any[];
  cargando = false;
  monto = 0;
  montoFijo = 0;

  constructor(public dialogRef: MatDialogRef<ProyeccionesComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data.lista != null){
      this.listaCuotas = data.lista;
      this.monto = data.monto;
      this.montoFijo = data.monto;
    }
    console.log(data);
   }
  
  ngOnInit(): void {
  }

}
