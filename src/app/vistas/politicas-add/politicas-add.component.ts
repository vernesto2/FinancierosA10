import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-politicas-add',
  templateUrl: './politicas-add.component.html',
  styleUrls: ['./politicas-add.component.css']
})
export class PoliticasAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PoliticasAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onCancelar() {
    this.dialogRef.close();
  }
}
