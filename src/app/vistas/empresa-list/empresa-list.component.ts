import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaService } from 'app/services/persona.service';
import { EmpresaAddComponent } from '../empresa-add/empresa-add.component';
declare var $: any;
@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  listaEmpresa: any[] = [];
  cargando1 = false;
  page1 = 1;
  page = 1;
  cargando = false;
  simulada=true;
  fechaSimulada: Date;
  listaClientes: any[] = [];

  constructor(public dialog: MatDialog, public personaService: PersonaService) { }

  ngOnInit(): void {
    this.llenarEmpresa();
  }

  onAgrego1() {
    this.llenarEmpresa();
  }
 
  LE(value: any) {
    if (value.index == 0) {
      this.listaClientes.length = 0;
      this.llenarEmpresa();
      
    } else if (value.index == 1) {
      this.listaEmpresa.length = 0;
      this.llenarCliente();
    }
  }

  llenarCliente() {
    this.cargando = true;
    this.personaService.listarPersonas().subscribe((lista: any) => {
      this.listaClientes = lista.body;
      console.log(this.listaClientes);
      this.cargando = false;
    });
  }

  llenarEmpresa() {
    this.cargando1 = true;
    this.personaService.listarEmpresa().subscribe((lista: any) => {
      this.listaEmpresa = lista.body;
      console.log(lista.body);
      this.cargando1 = false;
    });
  }

  openDialogEmpresa(empresa?: EmpresaModel) {
    const data = {
      onAgrego1: this.onAgrego1
    }
    let dialogref = this.dialog.open(EmpresaAddComponent, { data: empresa });
    const sub = dialogref.componentInstance.onAgregado1.subscribe(() => {
      this.onAgrego1();
    });
    dialogref.afterClosed().subscribe( res => {});
  }
  seleccionarFecha(value: any) {
    this.fechaSimulada = value;
    this.simulada = false;
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


}
