import { PersonaService } from 'app/services/persona.service';
import { PersonaNaturalModel } from './../../models/personaNatural.model';
import { ProyeccionesComponent } from './../proyecciones/proyecciones.component';
import { BienGarantiaModel } from './../../models/bienGarantia.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  cuota = '';
  interes = '';
  capital = '';
  tipoTiempo = '';
  disTiempo = true;

  //Para seleccionar Cliente y Fiador
  listaCliente: any[] = [];
  clienteSel = new PersonaNaturalModel();
  listaFiador: any[] = [];
  fiadorSel = new PersonaNaturalModel();
  duiCliente = 'DUI';
  nombreCliente = 'Nombres';
  duiFiador = 'DUI';
  nombreFiador = 'Nombres';

  constructor(public dialog: MatDialog, private fb: FormBuilder, public servicesCP: CreditosService,
    private personaService: PersonaService) { }
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

  cambioFiador() {
    if (this.hipotecario = true) {
      this.fiador = false;
    }
  }

  cambioHipotecario() {
    if (this.fiador = true) {
      this.hipotecario = false;
    }
  }

  guardarCP(forma: NgForm) {
    if (forma.invalid) {
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
    }, err => {
      this.showNotification('bottom', 'right', 'Ocurrio un problema.!', 'cancel', 'danger');
    });
  }

  seleccionoCliente(cliente: PersonaNaturalModel) {
    this.showNotification('top', 'right', 'Cliente seleccionado', 'check', 'info');
    this.clienteSel = cliente;
    this.duiCliente = cliente.dui;
    this.nombreCliente = cliente.nombres + ' ' + cliente.apellidos;
  }

  buscarDUICliente(value: any) {
    console.log(value.length);
    if (value.length == 10) {
      //aqui tiene q ir en EndPoint de buscar por DUI
      this.personaService.buscarPor(value).subscribe((lista: any) => {
        this.listaCliente = lista.body;
        console.log(this.listaCliente);
      }, err => {
        this.showNotification('bottom', 'right', 'Cliente no encontrado!', 'cancel', 'danger');
      });
    }
  }

  seleccionoFiador(fiador: PersonaNaturalModel) {
    this.showNotification('top', 'right', 'Fiador seleccionado', 'check', 'info');
    this.fiadorSel = fiador;
    this.duiFiador = fiador.dui;
    this.nombreFiador = fiador.nombres + ' ' + fiador.apellidos;
  }

  buscarDUIFiador(value: any) {
    if (value.length == 9) {
      //aqui tiene q ir en EndPoint de buscar por DUI
      this.personaService.buscarPor(value).subscribe((lista: any) => {
        this.listaFiador = lista.body;
        console.log(this.listaFiador);
      }, err => {
        this.showNotification('bottom', 'right', 'Fiador no encontrado!', 'cancel', 'danger');
      });
    }
  }

  llamarContrato() {
    if (this.clienteSel != null && this.fiadorSel != null) {

      window.open("http://localhost:4200/reportes/contrato-credito", "_blank");
    } else {

    }
  }

  openDialogProyecciones() {
    let info = {
      lista: this.listaCuotas,
      monto: this.credito.monto
    }
    const dialogref = this.dialog.open(ProyeccionesComponent, { data: info });
    dialogref.beforeClosed().subscribe(res => { });
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

  cargandoPolitica() {
    $.notify({
      icon: 'replay',
      message: 'Cargando...'

    }, {
      type: '',
      placement: {
        from: 'top',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons fa-spin" data-notify="icon">replay</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>'
    });
  }

  seleccionarTipo(tipo: string) {
    this.tipoCredito = tipo;
    if (this.credito.monto != null && this.credito.tiempo != null) {
      ////////////////////////
      this.servicesCP.calcularPrecredito(this.credito, this.tipoCredito).subscribe((obj: any) => {
        //console.log(obj);
        if (obj.status == 200) {
          this.listaCuotas = obj.body.cuotas;
          console.log(obj);
          this.cuota = this.listaCuotas[0].interes + this.listaCuotas[0].capitalAmortizado;
          this.interes = this.listaCuotas[0].interes;
          this.capital = this.listaCuotas[0].capitalAmortizado;
          this.activarProyeccion = false;
          this.showNotification('top', 'right', 'Política seleccionada', 'check', 'success');
        } else {
          this.showNotification('bottom', 'right', 'Política no encontrada', 'cancel', 'danger');
        }
      }, err => {
        this.activarProyeccion = true;
        this.showNotification('top', 'right', 'Política no encontrada', 'cancel', 'danger');
      });
    }
  }

  calcularTiempo(value: number) {

    if (this.tipoCredito != '' && this.credito.monto != null) {
      if (value > 0 && value < 73) {
        this.servicesCP.calcularPrecredito(this.credito, this.tipoCredito).subscribe((obj: any) => {
          //console.log(obj);
          if (obj.status == 200) {
            this.listaCuotas = obj.body.cuotas;
            this.cuota = this.listaCuotas[0].interes + this.listaCuotas[0].capitalAmortizado;
            this.interes = this.listaCuotas[0].interes;
            this.capital = this.listaCuotas[0].capitalAmortizado;
            this.activarProyeccion = false;
            this.showNotification('top', 'right', 'Política seleccionada', 'check', 'success');
          } else {
            this.showNotification('bottom', 'right', 'Política no encontrada', 'cancel', 'danger');
          }
        }, err => {
          this.activarProyeccion = true;
          this.showNotification('top', 'right', 'Política no encontrada', 'cancel', 'danger');
        });
      }
    }
  }

  calcularMonto(value: number) {
    if (this.tipoCredito != '' && this.credito.tiempo != null) {
      if (value >= 500 && value <= 20000) {
        this.servicesCP.calcularPrecredito(this.credito, this.tipoCredito).subscribe((obj: any) => {
          //console.log(obj);
          if (obj.status == 200) {
            this.listaCuotas = obj.body.cuotas;
            this.cuota = this.listaCuotas[0].interes + this.listaCuotas[0].capitalAmortizado;
            this.interes = this.listaCuotas[0].interes;
            this.capital = this.listaCuotas[0].capitalAmortizado;
            this.activarProyeccion = false;
            this.showNotification('top', 'right', 'Política seleccionada', 'check', 'success');
          } else {
            this.showNotification('bottom', 'right', 'Política no encontrada', 'cancel', 'danger');
          }
        }, err => {
          this.activarProyeccion = true;
          this.showNotification('top', 'right', 'Política no encontrada', 'cancel', 'danger');
        });
      }
    }
  }

  openDialogPersona(persona?: PersonaNaturalModel) {
    let dialogref = this.dialog.open(PersonaAddComponent, { data: persona });

    dialogref.afterClosed().subscribe(res => { });
  }

  seleccionarTiempo(value: string) {
    this.disTiempo = false;
    this.tipoTiempo = value;
    console.log(this.tipoTiempo);
  }

  validarRangos() {
    
  }
}
