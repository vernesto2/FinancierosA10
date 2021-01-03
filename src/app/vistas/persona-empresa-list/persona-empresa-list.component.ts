import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaAddComponent } from '../empresa-add/empresa-add.component';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-empresa-list',
  templateUrl: './persona-empresa-list.component.html',
  styleUrls: ['./persona-empresa-list.component.css']
})
export class PersonaEmpresaListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPersona() {
    const dialogref = this.dialog.open(PersonaAddComponent, {});
    dialogref.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

  openDialogEmpresa() {
    const dialogref = this.dialog.open(EmpresaAddComponent, {});
    dialogref.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

}
