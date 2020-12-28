import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-persona-empresa-add',
  templateUrl: './persona-empresa-add.component.html',
  styleUrls: ['./persona-empresa-add.component.css']
})
export class PersonaEmpresaAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PersonaEmpresaAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onCancelar() {
    this.dialogRef.close();
  }

}
