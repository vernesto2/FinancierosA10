import { PoliticasService } from './../../services/politicas.service';
import { PoliticaModel } from './../../models/politica.model';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Output } from '@angular/core';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-politicas-add',
  templateUrl: './politicas-add.component.html',
  styleUrls: ['./politicas-add.component.css']
})
export class PoliticasAddComponent implements OnInit {
  //inicializar el constructor del modal
  politicas = new PoliticaModel();

   //variables de comunicacion con el padre
   @Output() onAgregado = new EventEmitter();
  
  constructor(public dialogRef: MatDialogRef<PoliticasAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
  public servicePolitica: PoliticasService) { }

  ngOnInit(): void {
  }

  guardarPoliticas(forma: NgForm){
    if(forma.invalid){
      return;
    }
    this.servicePolitica.agregarPoliticas(this.politicas).subscribe(res => {
      this.showNotification('top', 'right');
      this.onAgregado.emit();
    })
  }

  showNotification(from, align) {
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
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
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
}
