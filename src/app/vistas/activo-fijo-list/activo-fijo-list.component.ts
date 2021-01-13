import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivoFijoService } from 'app/services/activo-fijo.service';
import { ActivoFijoAddComponent } from '../../vistas/activo-fijo-add/activo-fijo-add.component';
import { DetalleActivoModel } from 'app/models/detalleActivo.model';
import { detalleAModel } from 'app/models/detalleAct.model';

@Component({
  selector: 'app-activo-fijo-list',
  templateUrl: './activo-fijo-list.component.html',
  styleUrls: ['./activo-fijo-list.component.css']
})
export class ActivoFijoListComponent implements OnInit {
  cargando = false;
  arrayDetalleActivo: Array<DetalleActivoModel>;
  listaAdquisicionActivo: any[];
  array: Array<string>;
  constructor(public dialog: MatDialog, public servicioDetalleAdquisicion: ActivoFijoService) {
  }

  ngOnInit(): void {
    this.llenarAdquisicionActivo();
  }
  checkuncheckall(a:DetalleActivoModel)
  {
    /*if(this.array==null && this.arrayDetalleActivo==null){
      this.array.push(a.codigoGenerado);
      this.arrayDetalleActivo.push(a);
    }
    if(this.array.indexOf(a.codigoGenerado)==-1){
      this.array.push(a.codigoGenerado);
      this.arrayDetalleActivo.push(a);
    }else{
      this.array.splice(this.array.push(a.codigoGenerado),1);
    }*/
    console.log(a.codigoGenerado);
    console.log("Separar");
    console.log(JSON.stringify(a));

  } 
  llenarAdquisicionActivo() {
    this.cargando = true;
    this.servicioDetalleAdquisicion.listarAdquisicion().subscribe((listaA: any) => {
      this.listaAdquisicionActivo = listaA.body;
      this.cargando = false;
    })
  } 

  openDialogActivoFijo() {
    const data = {
      
    }
    let dialogref = this.dialog.open(ActivoFijoAddComponent, {});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      
    });
    dialogref.afterClosed().subscribe( res => {});
  }

}
