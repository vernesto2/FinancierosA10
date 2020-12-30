import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivoFijoModel } from 'app/models/activoFijo.model';
import { Unidad } from 'app/models/unidad.model';
import { ActivoFijoService } from 'app/services/activo-fijo.service';
@Component({
  selector: 'app-activo-fijo-add',
  templateUrl: './activo-fijo-add.component.html',
  styleUrls: ['./activo-fijo-add.component.css']
})
export class ActivoFijoAddComponent implements OnInit {
  // variables globales
  activo = new ActivoFijoModel(); //modelo que se usara para relacionar el formulario
  valido = true; //variable para controlar el estado del Departamento
  
  //variables para autocompletar codigo
  cunidad: number;
  cdepto: number;
  ctipo: number;
  ccorrelativo: number;

//combos
  listaUnidad: any[]; //lista del combo Unidad solo sirve para listar
  listatipoactivo: any[];
  listaDeptoPorUnidad: any[];

  constructor(public dialogRef: MatDialogRef<ActivoFijoAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
    public serviceActivo: ActivoFijoService) { }

  ngOnInit(): void {
    //listamos las unidades 
    this.serviceActivo.listarUnidad().subscribe((lista: any[]) => {
      this.listaUnidad = lista; //obtenemos el listado y lo guardamos a la variable
      //console.log(lista);
    });

    this.serviceActivo.listarTipoActivo().subscribe((lista: any[]) => {
      this.listatipoactivo = lista;
      //console.log(lista);
    });
  }

  guardarActivo(forma: NgForm) { //funcion que activara el guardar el formulario
    if (forma.invalid) {
      return;
    }

    console.log(this.activo);
    this.activo.correlativo = this.ccorrelativo;
    this.serviceActivo.agregarActivoFijo(this.activo).subscribe(res => console.log(res));
  }

  onCancelar() {
    this.dialogRef.close();
  }

  unidadSeleccionada(us) {
    this.serviceActivo.listarDepartamentoPorUnidad(us.codigo).subscribe((lista: any[]) => {
      this.listaDeptoPorUnidad = lista;
      this.cunidad = us.codigo;
      //console.log(this.cunidad)

      if(this.listaDeptoPorUnidad.length > 0){
        this.valido = false;
      } else {
        this.valido = true;
      }
    })
    //console.log(us);
  }

  deptoSeleccionada(codigo) {
    this.cdepto = codigo.codigo;

    if (this.ctipo > 0) {
      this.serviceActivo.correlativo(this.ctipo, this.cdepto, this.cunidad).subscribe((correlativo: any) => {
        this.ccorrelativo = correlativo.correlativo;
        //console.log(this.ccorrelativo);
      });
    }
  }
  tipoASeleccionada(codigo) {
    this.ctipo = codigo.codigo;

    if (this.cdepto > 0) {
      this.serviceActivo.correlativo(this.ctipo, this.cdepto, this.cunidad).subscribe((correlativo: any) => {
        this.ccorrelativo = correlativo.correlativo;
        //console.log(this.ccorrelativo);
      });
    }
  }
}
