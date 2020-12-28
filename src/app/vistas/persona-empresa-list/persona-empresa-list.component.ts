import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonaEmpresaAddComponent } from '../persona-empresa-add/persona-empresa-add.component';

@Component({
  selector: 'app-persona-empresa-list',
  templateUrl: './persona-empresa-list.component.html',
  styleUrls: ['./persona-empresa-list.component.css']
})
export class PersonaEmpresaListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPersonaEmpresa() {
    const dialogref = this.dialog.open(PersonaEmpresaAddComponent, {});
    dialogref.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

}
