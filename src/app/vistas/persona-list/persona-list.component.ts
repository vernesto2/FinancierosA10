import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { PersonaService } from 'app/services/persona.service';
import { PersonaAddComponent } from '../persona-add/persona-add.component';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css']
})
export class PersonaListComponent implements OnInit {

  listaPersonaNatural: any[];
  cargando = false;
  page = 1;

  constructor(public dialog: MatDialog, public personaService: PersonaService) { }

  ngOnInit(): void {
    this.llenarPersonaNatural();
  }

  onAgrego() {
    this.llenarPersonaNatural();
  }

  llenarPersonaNatural() {
    this.cargando = true;
    this.personaService.listarPersonas().subscribe((res: any) => {
      this.listaPersonaNatural = res.body;
      this.cargando = false;
    });
  }

  openDialogPersona(persona?: PersonaNaturalModel) {
    const data = {
      onAgrego: this.onAgrego
    }
    let dialogref = this.dialog.open(PersonaAddComponent, { data: persona });
    const sub = dialogref.componentInstance.onAgregado.subscribe(() => {
      this.onAgrego();
    });
    dialogref.afterClosed().subscribe( res => {});
  }

}
