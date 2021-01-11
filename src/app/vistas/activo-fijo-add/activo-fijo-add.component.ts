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
  @Output() onAgregado = new EventEmitter();
  maxDate: Date;

  constructor() { 
    this.maxDate = new Date();
  }

  ngOnInit(): void {

  }

 
}
