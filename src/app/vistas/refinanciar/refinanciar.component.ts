import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreditoModel } from 'app/models/credito.model';

@Component({
  selector: 'app-refinanciar',
  templateUrl: './refinanciar.component.html',
  styleUrls: ['./refinanciar.component.css']
})
export class RefinanciarComponent implements OnInit {

  forma: FormGroup;
  constructor(public dialogRef: MatDialogRef<RefinanciarComponent>, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  guardar() {

  }
  onCancelar() {
    this.dialogRef.close();
  }
}
