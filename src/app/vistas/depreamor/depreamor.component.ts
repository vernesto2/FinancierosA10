import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-depreamor',
  templateUrl: './depreamor.component.html',
  styleUrls: ['./depreamor.component.css']
})
export class DepreamorComponent implements OnInit {
  cal="";
  titulo:string;
  lista:any;
  codigo:string;
  activo:string;
  tipo:string;
  departamento:string;
  unidad:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    if(data.tipoCalculo==="DEPRECIA"){
      this.titulo="depreciacion";
    }else{
      this.titulo="amortizacion";
    }
    this.lista=data;
  }

  ngOnInit(): void {
    this.llenarcampos();
  }

  llenarcampos(){
    this.codigo=this.lista.codigoGenrado;
    this.tipo=this.lista.tipoActivo;
    this.activo=this.lista.nombre;
    this.departamento=this.lista.departamento;
    this.unidad=this.lista.unidad;
  }

  anio() {
    
  }

}
