import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonaService } from 'app/services/persona.service';
import { EmpresaAddComponent } from '../empresa-add/empresa-add.component';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-empresa-list',
  templateUrl: './persona-empresa-list.component.html',
  styleUrls: ['./persona-empresa-list.component.css']
})
export class PersonaEmpresaListComponent implements OnInit {

  listaPersonaNatural: any[];
  listaEmpresa: any[];
  cargando = false;
  cargando1 = false;
  page = 1;
  page1 = 1;

  constructor(public dialog: MatDialog, public personaService: PersonaService) { }

  ngOnInit(): void {
    this.llenarPersonaNatural();
  }

  onAgrego() {
    this.llenarPersonaNatural();
  }

  llenarPersonaNatural() {
    this.cargando = true;
    this.cargando1 = true;
    this.personaService.listarPersonas().subscribe((res: any) => {
      this.listaPersonaNatural = res;
      this.listaEmpresa = [];
      this.cargando = false;
      this.cargando1 = false;
    });
  }

  openDialogPersona() {
    const data = {
      onAgrego: this.onAgrego
    }
    let dialogref = this.dialog.open(PersonaAddComponent, {});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.afterClosed().subscribe( res => {});
  }

  openDialogEmpresa() {
    const dialogref = this.dialog.open(EmpresaAddComponent, {});
    dialogref.afterClosed().subscribe( res => {});
  }

}
