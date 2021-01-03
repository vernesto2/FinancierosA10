import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DireccionModel } from 'app/models/direccion.model';
import { PersonaModel } from 'app/models/persona.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { UbicacionModel } from 'app/models/ubicacion.model';
import { PersonaService } from 'app/services/persona.service';

@Component({
  selector: 'app-persona-add',
  templateUrl: './persona-add.component.html',
  styleUrls: ['./persona-add.component.css']
})
export class PersonaAddComponent implements OnInit {

  forma: FormGroup;
  persona = new PersonaModel();
  personaNatural = new PersonaNaturalModel();
  direccion = new DireccionModel();
  ubicacion = new UbicacionModel();
  listaDepartamento: any[];
  listaMunicipio: any[];
  valido = true;

  //agregando la fecha minima y maxima para validar los datepicker
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<PersonaAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
  private fb: FormBuilder, public personaService: PersonaService) {
    this.crearFormulario();

    //seteando las fechas minimas y maximas
    const currentYear = new Date().getFullYear(); //obtenemos el año actual
    const currentDay = new Date().getDate(); //sacamos los dias actuales
    const currentMonth = new Date().getMonth(); // aqui obtenemos el mes, pero inicia desde 0
    console.log(currentYear + '-' + currentMonth + '-' + currentDay );
    //                      2021 - 65 = 1956, mes       0,  dia    2  fecha minima que se mostrara
    // -- aqui estamos indicando que la persona tiene que tener al menos 65 años de edad como maximo para hacer un credito
    this.minDate = new Date(currentYear - 65, currentMonth, currentDay);
    //                      2021 - 18 = 2003, mes       0,  dia    2  fecha maxima que se mostrara
    // -- con esto estamos validando que la persona tiene que ser mayor de 18 años
    this.maxDate = new Date(currentYear - 18 , currentMonth, currentDay);
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

      dui: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3)]],
      estadoCivil: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],

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

  separarModelos() {

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
