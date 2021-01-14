import { EmpresaModel } from 'app/models/empresa.model';
import { CreditoEmpresaModel } from './../../models/creditoEmpresa.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RazonesModel } from 'app/models/razones.model';
import { Observable } from 'rxjs';
import { RazonesFinancierasComponent } from '../razones-financieras/razones-financieras.component';
import { CreditoModel } from 'app/models/credito.model';
import { CreditosService } from 'app/services/creditos.service';

@Component({
  selector: 'app-credito-empresa-add',
  templateUrl: './credito-empresa-add.component.html',
  styleUrls: ['./credito-empresa-add.component.css']
})
export class CreditoEmpresaAddComponent implements OnInit {
  creditoempresa = new CreditoEmpresaModel();
  credito = new CreditoModel();
  empresa = new EmpresaModel();

  forma: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  myControl = new FormControl();
  filteredOptions: Observable<true>; //filteredOptions: Observable<User[]>;
  hipotecario = true;
  fiador = true;

  constructor(public dialog: MatDialog, private fb: FormBuilder, public servicesCE: CreditosService) { }

  ngOnInit(): void {
    this.crearFormuario();

  }
  cambioFiador() {
    if (this.hipotecario = true) {
      this.fiador = false;
    }
  }

  cambioHipotecario() {
    if (this.fiador = true) {
      this.hipotecario = false;
    }
  }

  crearFormuario() {
    this.forma = this.fb.group({

    });
  }

  guardarCE() { }

  openDialogRazones(razones?: RazonesModel) {
    let dialogref = this.dialog.open(RazonesFinancierasComponent, { });
  }
}
