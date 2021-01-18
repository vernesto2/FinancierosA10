import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreditoPersonalModel } from 'app/models/creditoPersonal.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { CreditosService } from 'app/services/creditos.service';
import { PersonaService } from 'app/services/persona.service';
import { PersonaAddComponent } from '../persona-add/persona-add.component';
import { RefinanciarComponent } from '../refinanciar/refinanciar.component';
declare var $: any;
@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  listaPersonaNatural: any[] = [];
  listaCredito: any[] = []; 
  listaCreditoPersonal: any[] = [];
  fechaSimulada: Date;
  simulada = true;
  cargando = false;
  page = 1;

  constructor(public dialog: MatDialog, public personaService: PersonaService, public serviceCP: CreditosService) { }

  ngOnInit(): void {
    this.llenarPersonaNatural();
  }

  onAgrego() {
    this.llenarPersonaNatural();
  }
  onAgregoRefinanciar() {
   // this.llenarRefinanciar();
  }

  llenarPersonaNatural() {
    this.cargando = true;
    this.personaService.listarPersonas().subscribe((res: any) => {
      this.listaPersonaNatural = res.body;
      this.cargando = false;
    });
  }

  llenarCreditoPersonal() {
    this.cargando = true;
    this.serviceCP.listaCreditoPersonaEnCurso().subscribe((res: any) => {
      this.listaCreditoPersonal = res.body;
      console.log(this.listaCreditoPersonal);
      this.cargando = false;
    });
  }

 /* llenarRefinanciar() {
    this.cargando = true;
    this.serviceCP.listarCredito().subscribe((res: any) => {
      this.listaCredito = res.body;
      this.cargando = false;
    });

  }*/

  openDialogPersona(persona?: PersonaNaturalModel) {
    const data = {
      onAgrego: this.onAgrego
    }
    let dialogref = this.dialog.open(PersonaAddComponent, { data: persona });
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.afterClosed().subscribe( res => {});
  }

  openDialogRefinanciar(financiar?: CreditoPersonalModel) {
    let dialogref = this.dialog.open(RefinanciarComponent, { data: financiar});
    const sub = dialogref.componentInstance.onAgregoRefinanciar.subscribe(() => {
      this.onAgregoRefinanciar();
    });
    dialogref.afterClosed().subscribe( res => {});
  }

  LP(value: any) {
    if (value.index == 0) {
      this.listaCreditoPersonal.length = 0;
      this.llenarPersonaNatural();

    } else if (value.index == 1) {
      this.listaPersonaNatural.length = 0;
      this.llenarCreditoPersonal();
    }
  }

  actualizarFecha() {
    if (this.fechaSimulada !== null) {
      let fecha=new Date(this.fechaSimulada);
      const dia=fecha.getDate();
      const mes=fecha.getMonth()+1;
      const anio=fecha.getFullYear();
      const f=anio+"-"+mes+"-"+dia;
      this.personaService.simularFecha(f).subscribe((res: any) => {
          console.log(res);
          this.showNotification('top', 'right', 'Se a simulado para la fecha '+res.fecha, 'sync', 'info');
      });
    }
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


  seleccionarFecha(value: any) {
    this.fechaSimulada = value;
    this.simulada = false;
  }
 
}
