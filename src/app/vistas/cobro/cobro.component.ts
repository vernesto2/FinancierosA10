import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent implements OnInit {

  mostrar = false;
  fecha:Date;
  constructor() { 
    this.fecha=new Date();
  }

  ngOnInit(): void {
  }

  mensaje(){
    console.log(this.mostrar);
  }

}
