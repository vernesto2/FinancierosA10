import { Component, OnInit } from '@angular/core';
import { ActivoFijoService } from 'app/services/activo-fijo.service';

@Component({
  selector: 'app-agrupacion-activo',
  templateUrl: './agrupacion-activo.component.html',
  styles: [
  ]
})
export class AgrupacionActivoComponent implements OnInit {

  listaTipoActivo: any[];

  constructor(public activoServicio:ActivoFijoService) { }

  ngOnInit(): void {
  }

  llenarComponente(){
    
  }

}
