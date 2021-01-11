import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RazonesModel } from 'app/models/razones.model';

@Component({
  selector: 'app-razones-financieras',
  templateUrl: './razones-financieras.component.html',
  styleUrls: ['./razones-financieras.component.css']
})
export class RazonesFinancierasComponent implements OnInit {

  razones = new RazonesModel();

   //variables para validar rangos de fecha
   minDateInicio: Date;
   maxDateInicio: Date;
   minDateFin: Date;
   maxDateFin: Date;
   fecValida = true;
   estado = false;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: string) {

    //seteando las fechas minimas y maximas
    const currentDay = new Date().getDate(); //sacamos los dias actual
    const currentMonth = new Date().getMonth(); // sacamos los meses actual
    const currentYear = new Date().getFullYear(); // sacamos el año actual

  }

  ngOnInit(): void {
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
  }

  onCancelar() {
    this.dialogRef.close();
  }

}
