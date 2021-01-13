import { ProyeccionesComponent } from './../proyecciones/proyecciones.component';
import { BienGarantiaModel } from './../../models/bienGarantia.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreditoModel } from 'app/models/credito.model';
import { CreditoPersonalModel } from 'app/models/creditoPersonal.model';
import { GarantiaFiadorModel } from 'app/models/garantiaFiador.model';
import { IngresoEgresoModel } from 'app/models/ingresoEgreso.model';
import { CreditosService } from 'app/services/creditos.service';
import { Observable } from 'rxjs';
import { PersonaAddComponent } from '../persona-add/persona-add.component';
declare var $: any;

@Component({
  selector: 'app-precredito-add',
  templateUrl: './precredito-add.component.html',
  styleUrls: ['./precredito-add.component.css']
})
export class PrecreditoAddComponent implements OnInit {
  creditoPersonal = new CreditoPersonalModel();
  credito = new CreditoModel();
  garantiaFiador = new GarantiaFiadorModel();
  ingresos = new IngresoEgresoModel();
  tipoCredito = '';

  forma: FormGroup;
  filteredOptions: Observable<true>; //filteredOptions: Observable<User[]>;
  hipotecario = true;
  fiador = true;

  listaCuotas: any = [];
  activarProyeccion = true;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public servicesCP: CreditosService) { }
  fecha: Date;
  ngOnInit(): void {
    const dias = new Date().getDate(); //sacamos los dias actual
    const mes = new Date().getMonth(); // sacamos los meses actual
    const año = new Date().getFullYear(); // sacamos el año actual
    //const fecha = año + '-' + mes + 1 + '-' + dias + 1;
    
    this.fecha = new Date(año, mes, dias);
    this.credito.fechaAprobacion = new Date(this.fecha);
    //console.log(this.fecha);
  }

  cambioFiador(){
    if(this.hipotecario = true){
      this.fiador = false;
    }
  }

  cambioHipotecario(){
    if(this.fiador = true){
      this.hipotecario = false;
    }
  }

  guardarCP(forma: NgForm){
    if(forma.invalid){
      return;
    }
    console.log(this.creditoPersonal);
    this.servicesCP.agregarCreditoPersona(this.creditoPersonal).subscribe(res => {
      console.log(res);
        if (res.status == 200) {
          this.showNotification('top', 'right', 'Agregado Correctamente!', 'save', 'success');
        } else {
          this.showNotification('bottom', 'right', 'Ocurrio un problema!', 'cancel', 'danger');
        }
    })
  }

  openDialogProyecciones() {
    let info = {
      lista: this.listaCuotas,
      monto: this.credito.monto
    }
    const dialogref = this.dialog.open(ProyeccionesComponent, { data: info});
    dialogref.beforeClosed().subscribe( res => {});
  }

  showNotification(from, align, message, icon, type) {
    $.notify({
        icon: icon,
        message: message

    }, {
        type: type,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">' + icon + '</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    }); 
  }

  seleccionarTipo(tipo: string) {
    console.log(tipo);
    this.tipoCredito = tipo;
  }

  calcular(value: number){
    if(value > 5) {
      console.log(this.credito);
      this.servicesCP.calcularPrecredito(this.credito, this.tipoCredito).subscribe((obj: any) => {
        console.log(obj);
        this.listaCuotas = obj.body.cuotas;
        this.activarProyeccion = false;
      });
    }
  }

}
