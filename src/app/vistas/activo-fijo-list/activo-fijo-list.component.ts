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
import { CalculoModel } from 'app/models/calculo.model';
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
  d=null;
  mostrarA=true;
  mostrarB=false;
  listabaja:any[];
  array=new CalculoModel();
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
    this.mostrarB=false;
      this.mostrarA=true;
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
    this.cargando = true;
    this.mostrarA=false;
    this.mostrarB=true;
    this.servicioDetalleAdquisicion.listardebaja().subscribe((listaA: any) => {
      this.listabaja = listaA.body;
      this.cargando = false;
    })
  }

  deprecia(a:any[]){
    let dialogref = this.dialog.open(DepreamorComponent, {data: a});
  }

  anio(a:any) {
    let cal=new CalculoModel();
    cal.activo=a.nombre;
    cal.codigo=a.codigoGenerado;
    cal.departamento=a.departamento;
    cal.unidad=a.unidad;
    cal.valor=a.precioUnidad;
    cal.monto=0;
    cal.acumulada=0;
    cal.ver="año";
    cal.fecha=a.fechaAdquisicion;
    cal.calc=a.tipoCalculo;
    cal.tipo=a.tipoActivo;
    cal.vidaUtil=a.vidaUtil;
    let dialogref = this.dialog.open(DepreamorComponent, {data: cal});
    //console.log(this.array);
  }
  mes(a:any) {
    let cal=new CalculoModel();
    cal.activo=a.nombre;
    cal.codigo=a.codigoGenerado;
    cal.departamento=a.departamento;
    cal.unidad=a.unidad;
    cal.valor=a.precioUnidad;
    cal.monto=0;
    cal.acumulada=0;
    cal.ver="mes";
    cal.fecha=a.fechaAdquisicion;
    cal.calc=a.tipoCalculo;
    cal.tipo=a.tipoActivo;
    cal.vidaUtil=a.vidaUtil;
    let dialogref = this.dialog.open(DepreamorComponent, {data: cal});
    //console.log(this.array);
  }
  dia(a:any) {
    let cal=new CalculoModel();
    cal.activo=a.nombre;
    cal.codigo=a.codigoGenerado;
    cal.departamento=a.departamento;
    cal.unidad=a.unidad;
    cal.valor=a.precioUnidad;
    cal.monto=0;
    cal.acumulada=0;
    cal.ver="dia";
    cal.fecha=a.fechaAdquisicion;
    cal.calc=a.tipoCalculo;
    cal.tipo=a.tipoActivo;
    cal.vidaUtil=a.vidaUtil;
    let dialogref = this.dialog.open(DepreamorComponent, {data: cal});
    //console.log(this.array);
  }

}
