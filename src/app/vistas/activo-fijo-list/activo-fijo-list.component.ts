import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivoFijoService } from 'app/services/activo-fijo.service';
import { ActivoFijoAddComponent } from '../../vistas/activo-fijo-add/activo-fijo-add.component';
import { detalleAModel } from 'app/models/detalleAct.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Output } from '@angular/core';import { DetalleBajaActivoComponent } from '../detalle-baja-activo/detalle-baja-activo.component';
import { DetalleActivoPKModel } from 'app/models/detalleActivoPK.model';
import { DetalleActivoModel } from 'app/models/detalleActivo.model';
import { DepreamorComponent } from '../depreamor/depreamor.component';
;

@Component({
  selector: 'app-activo-fijo-list',
  templateUrl: './activo-fijo-list.component.html',
  styleUrls: ['./activo-fijo-list.component.css']
})
export class ActivoFijoListComponent implements OnInit {
  cargando = false;
  arrayDetalleActivo: DetalleActivoModel[] = [];
  listaAdquisicionActivo: any[];
  codigoGenerado: string;
  page = 1;
  d="DEPRECIA";
  constructor(public dialog: MatDialog, public servicioDetalleAdquisicion: ActivoFijoService) {
  }

  ngOnInit(): void {
    this.llenarAdquisicionActivo();
  }
  checkuncheckall(a:DetalleActivoModel,e,i:number)
  {
    let idPK= new DetalleActivoPKModel();
    let det= new DetalleActivoModel();
    det.codigoGenerado=a.codigoGenerado;
    det.nombre=a.nombre;
    det.idAdquisicion=a.idAdquisicion;
    det.correlativo=a.correlativo;
    idPK.idAdquisicion=a.idAdquisicion;
    idPK.correlativo=a.correlativo;
    det.id=idPK;
    det.precio=0.0;
    if(e.checked){
      this.arrayDetalleActivo.push(det);
    }else{
      this.arrayDetalleActivo.splice(i,1);
    }
    console.log("Separar");
    console.log(JSON.stringify(this.arrayDetalleActivo));
  } 
  detalledebaja(){
    this.arrayDetalleActivo;
  }
  llenarAdquisicionActivo() {
    this.cargando = true;
    this.servicioDetalleAdquisicion.listarAdquisicion().subscribe((listaA: any) => {
      this.listaAdquisicionActivo = listaA.body;
      this.cargando = false;
    })
  } 
  openDialogDetalleBaja(){
    const data={
      onAgrego: this.onAgrego,
    }
    let dialogref = this.dialog.open(DetalleBajaActivoComponent, {data: this.arrayDetalleActivo});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.beforeClosed().subscribe( res => {});
  }
 onAgrego(){
    this.llenarAdquisicionActivo() ;
  }
  
  openDialogActivoFijo() {
    const data = {  
    }
    let dialogref = this.dialog.open(ActivoFijoAddComponent, {});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
    });
    dialogref.afterClosed().subscribe( res => {});
  }

  disponible(){
    this.llenarAdquisicionActivo() ;
  }

  baja(){

  }

  deprecia(a:any){
    let dialogref = this.dialog.open(DepreamorComponent, {data: a});
  }

}
