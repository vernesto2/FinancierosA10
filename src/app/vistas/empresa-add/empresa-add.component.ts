import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DireccionModel } from 'app/models/direccion.model';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaModel } from 'app/models/persona.model';
import { UbicacionModel } from 'app/models/ubicacion.model';
import { PersonaService } from 'app/services/persona.service';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {

  forma: FormGroup;
  persona = new PersonaModel();
  personaJuridica = new EmpresaModel();
  direccion = new DireccionModel();
  ubicacion = new UbicacionModel();
  listaDepartamento: any[];
  listaMunicipio: any[];
  valido = true;

  constructor(public dialogRef: MatDialogRef<EmpresaAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
  private fb: FormBuilder, public personaService: PersonaService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.personaService.listarDepartamento().subscribe((lista: any) => {
      this.listaDepartamento = lista;
    });
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nit: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],

      direccion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],

      nombre: ['', [Validators.required, Validators.minLength(3)]],
      representante: ['', [Validators.required]],

      telefonos: this.fb.array([
          this.fb.group({
          descripcion: ['', ],
          telefono: ['', [Validators.minLength(8), Validators.maxLength(8)]]
        })
      ]),
    }, {
      validators: []
    });
  }

  guardar() {
    if (this.forma.invalid) {
      console.log('Campos invalidos');
    }

    this.crearFormulario();
  }

  deptoSeleccionado(depto) {
    this.personaService.listarMunicipioPorDepto(depto.codigo).subscribe((lista: any[]) => {
      this.listaMunicipio = lista;

      if (this.listaMunicipio.length > 0) {
        this.valido = false;
      } else {
        this.valido = true;
      }
    });
  }

  agregarTelefonos() {
    this.telefonos.push(
      this.fb.group({
          descripcion: ['', ],
          telefono: ['', [Validators.minLength(8), Validators.maxLength(8)]]
      })
    );
  }

  eliminarTelefonos(i: number) {
    this.telefonos.removeAt(i);
  }

  onCancelar() {
    this.dialogRef.close();
  }

  // Validaciones del formulario
  get telefonos() {
    return this.forma.get('telefonos') as FormArray;
  }

}
