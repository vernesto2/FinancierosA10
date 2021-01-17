import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit {

  mostrar = false;
  vercampos = true;

  fecha:Date;
  constructor() { 
    this.fecha=new Date();
  }

  ngOnInit(): void {
  }

  mensaje(){
    console.log(this.mostrar);
  }

  habilitarMontos(value: number){
    if (value == 2) { 
      this.vercampos = false;
    } else {
      this.vercampos = true;
    }
  }
}
