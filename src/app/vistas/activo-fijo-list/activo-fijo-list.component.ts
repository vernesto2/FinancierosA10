import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivoFijoService } from 'app/services/activo-fijo.service';
import { ActivoFijoAddComponent } from '../../vistas/activo-fijo-add/activo-fijo-add.component';

@Component({
  selector: 'app-activo-fijo-list',
  templateUrl: './activo-fijo-list.component.html',
  styleUrls: ['./activo-fijo-list.component.css']
})
export class ActivoFijoListComponent implements OnInit {
  cargando = false;
  constructor(public dialog: MatDialog, public serviceActivoFijo: ActivoFijoService) {
  }

  ngOnInit(): void {
  }

  openDialogActivoFijo() {
    const data = {
      
    }
    let dialogref = this.dialog.open(ActivoFijoAddComponent, {});
    dialogref.afterClosed().subscribe( res => {});
  }

  filaSelecionada(){
   
  }

}
