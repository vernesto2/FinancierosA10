import { Component, OnInit } from '@angular/core';
import { PoliticasAddComponent } from '../politicas-add/politicas-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-politicas-list',
  templateUrl: './politicas-list.component.html',
  styleUrls: ['./politicas-list.component.css']
})
export class PoliticasListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogPoliticas() {
    const dialogref = this.dialog.open(PoliticasAddComponent, {});
    dialogref.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

}
