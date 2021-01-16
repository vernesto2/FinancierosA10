import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreditoPersonalModel } from 'app/models/creditoPersonal.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { CreditosService } from 'app/services/creditos.service';
import { PersonaService } from 'app/services/persona.service';
import { PersonaAddComponent } from '../persona-add/persona-add.component';
import { RefinanciarComponent } from '../refinanciar/refinanciar.component';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  listaPersonaNatural: any[];
  listaCredito: any[]; 

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
      this.listaPersonaNatural.length = 0;
      this.llenarPersonaNatural();
    } 
  }

  /*
     LE(value: any) {
    if (value.index == 0) {
      this.listaClientes.length = 0;
      this.llenarEmpresa();
    } else if (value.index == 1) {
      this.listaEmpresa.length = 0;
      this.llenarCliente();
    }
  }
  */
}
