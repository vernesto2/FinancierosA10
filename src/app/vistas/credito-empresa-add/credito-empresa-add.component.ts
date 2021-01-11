import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-credito-empresa-add',
  templateUrl: './credito-empresa-add.component.html',
  styleUrls: ['./credito-empresa-add.component.css']
})
export class CreditoEmpresaAddComponent implements OnInit {
  forma: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  myControl = new FormControl();
  filteredOptions: Observable<true>; //filteredOptions: Observable<User[]>;
  hipotecario = true;
  fiador = true;

  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormuario();

    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

  }
  cambioFiador(){
    if(this.hipotecario = true){
      this.fiador = false;
    }
  }

  cambioHipotecario(){
    if(this.fiador = true){
      this.hipotecario = false;
    }
  }
  
  crearFormuario() {
    this.forma = this.fb.group({

    });
  }

  guardar() { }

  displayFn(): any { } // displayFn(user: User)
}
