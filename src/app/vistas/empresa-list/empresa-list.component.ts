import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaService } from 'app/services/persona.service';
import { EmpresaAddComponent } from '../empresa-add/empresa-add.component';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})
export class EmpresaListComponent implements OnInit {

  listaEmpresa: any[];
  cargando1 = false;
  page1 = 1;

  constructor(public dialog: MatDialog, public personaService: PersonaService) { }

  ngOnInit(): void {
    this.llenarEmpresa();
  }

  onAgrego1() {
    this.llenarEmpresa();
  }


  llenarEmpresa() {
    this.cargando1 = true;
    this.personaService.listarEmpresa().subscribe((lista: any) => {
      this.listaEmpresa = lista.body;
      //console.log(this.listaEmpresa);
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

}
