import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaModel } from 'app/models/persona.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { PersonaService } from 'app/services/persona.service';
import { EmpresaAddComponent } from '../empresa-add/empresa-add.component';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-empresa-list',
  templateUrl: './persona-empresa-list.component.html',
  styleUrls: ['./persona-empresa-list.component.css']
})
export class PersonaEmpresaListComponent implements OnInit {

  listaPersonaNatural: any = [];
  listaEmpresa: any[];
  cargando = false;
  cargando1 = false;
  page = 1;
  page1 = 1;

  constructor(public dialog: MatDialog, public personaService: PersonaService) { }

  ngOnInit(): void {
    this.llenarPersonaNatural();
    this.llenarEmpresa();
  }

  onAgrego() {
    this.llenarPersonaNatural();
  }

  onAgrego1() {
    this.llenarEmpresa();
  }

  llenarPersonaNatural() {
    this.cargando = true;
    this.personaService.listarPersonas().subscribe((res: any) => {
      this.listaPersonaNatural = res.body;
      this.cargando = false;
    });
  }

  llenarEmpresa() {
    this.cargando1 = true;
    this.personaService.listarEmpresa().subscribe((lista: any) => {
      this.listaEmpresa = lista.body;
      this.cargando1 = false;
    });
  }

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

}
