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
  activos: any[];

  constructor(public dialog: MatDialog, public serviceActivoFijo: ActivoFijoService) { 
    this.serviceActivoFijo.listarActivos().subscribe((res: any) => {
      this.activos = res;
      //console.log(res);
    });
  }

  ngOnInit(): void {

  }

  openDialogActivoFijo() {
    const dialogref = this.dialog.open(ActivoFijoAddComponent, {});
    dialogref.afterClosed().subscribe( res => {
      console.log(res);
    });
  }
}
