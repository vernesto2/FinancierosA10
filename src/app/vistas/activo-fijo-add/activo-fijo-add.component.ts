import { Router } from '@angular/router';
import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivoFijoModel } from 'app/models/activoFijo.model';
import { Unidad } from 'app/models/unidad.model';
import { ActivoFijoService } from 'app/services/activo-fijo.service';
declare var $: any; //variable que se usara para las notificaciones

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

  //variables de comunicacion con el padre
  @Output() onAgregado = new EventEmitter();

//combos
  listaUnidad: any[]; //lista del combo Unidad solo sirve para listar
  listatipoactivo: any[];
  listaDeptoPorUnidad: any[];
  listaActivo: any[];

  constructor(public dialogRef: MatDialogRef<ActivoFijoAddComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    public serviceActivo: ActivoFijoService, private router: Router) { }

  ngOnInit(): void {
    this.activo.codigoGenerado = '';
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

    //console.log(this.activo);
    this.activo.correlativo = this.ccorrelativo;
    this.serviceActivo.agregarActivoFijo(this.activo).subscribe(res => {
      this.showNotification('top', 'right');
      this.onAgregado.emit();
    });
  }

  showNotification(from, align) {
    const type = ['success'];

    $.notify({
        icon: "save",
        message: " Guardado exitosamente.!"

    }, {
        type: 'success',
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">save</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

  onCancelar() {
    this.dialogRef.close();
  }

  unidadSeleccionada(us) {
    this.serviceActivo.listarDepartamentoPorUnidad(us.codigo).subscribe((lista: any[]) => {
      this.listaDeptoPorUnidad = lista;
      this.cunidad = us.codigo;

      if (this.listaDeptoPorUnidad.length > 0) {
        this.valido = false;
      } else {
        this.valido = true;
      }
    });
  }

  deptoSeleccionada(codigo) {
    this.cdepto = codigo.codigo;

    if (this.ctipo > 0) {
      this.serviceActivo.correlativo(this.ctipo, this.cdepto, this.cunidad).subscribe((correlativo: any) => {
        this.ccorrelativo = correlativo.correlativo;
        //console.log(correlativo);
        this.activo.codigoGenerado = correlativo.codigoGenerado;
      });
    }
  }

  tipoASeleccionada(codigo) {
    this.ctipo = codigo.codigo;

    if (this.cdepto > 0) {
      this.serviceActivo.correlativo(this.ctipo, this.cdepto, this.cunidad).subscribe((correlativo: any) => {
        this.ccorrelativo = correlativo.correlativo;
        //console.log(correlativo);
        this.activo.codigoGenerado = correlativo.codigoGenerado;
      });
    }
  }
}
