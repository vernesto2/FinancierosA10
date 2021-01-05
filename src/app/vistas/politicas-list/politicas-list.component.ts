import { PoliticasService } from './../../services/politicas.service';
import { Component, OnInit } from '@angular/core';
import { PoliticasAddComponent } from '../politicas-add/politicas-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-politicas-list',
  templateUrl: './politicas-list.component.html',
  styleUrls: ['./politicas-list.component.css']
})
export class PoliticasListComponent implements OnInit {
  listaPoliticas: any[];
  cargando = false;
  page = 1; //variable que llevara el control de la pagina de la paginacion

  constructor(public dialog: MatDialog, public servicePoliticas: PoliticasService) { }

  ngOnInit(): void {
    this.llenarPoliticas();
  }

  llenarPoliticas(){
    this.cargando = true;
    this.servicePoliticas.listarPoliticas().subscribe((res: any) => {
      this.listaPoliticas = res;
      this.cargando = false;
      
    })
  }

  openDialogPoliticas() {
    const data = {
      onAgrego: this.onAgrego
    }
    const dialogref = this.dialog.open(PoliticasAddComponent, {});
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.beforeClosed().subscribe( res => {});
  }

  onAgrego(){
    this.llenarPoliticas();
  }

}
