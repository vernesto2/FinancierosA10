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
  activos: any[];
  navegacion;

  constructor(public dialog: MatDialog, public serviceActivoFijo: ActivoFijoService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.llenarActivoFijo();
  }
  onAgrego() {
    this.llenarActivoFijo();
  }
  llenarActivoFijo() {
    this.serviceActivoFijo.listarActivos().subscribe((res: any) => {
      this.activos = res;
      console.log(this.activos);
    });
  }

  openDialogActivoFijo() {
    const data = {
      onAgrego: this.onAgrego
    }
    let dialogref = this.dialog.open(ActivoFijoAddComponent, {});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.afterClosed().subscribe( res => {
      this.activos = res;
        this.onAgrego();
    });
  }

}
