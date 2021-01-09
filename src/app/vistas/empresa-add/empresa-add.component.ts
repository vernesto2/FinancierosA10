import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DireccionModel } from 'app/models/direccion.model';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaModel } from 'app/models/persona.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { TelModel } from 'app/models/tel.model';
import { TelefonoModel } from 'app/models/telefono.model';
import { UbicacionModel } from 'app/models/ubicacion.model';
import { PersonaService } from 'app/services/persona.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-empresa-add',
  templateUrl: './empresa-add.component.html',
  styleUrls: ['./empresa-add.component.css']
})
export class EmpresaAddComponent implements OnInit {

  @Output() onAgregado1 = new EventEmitter();

  forma: FormGroup;
  persona = new PersonaModel();
  personaNatural = new PersonaNaturalModel();
  direccion = new DireccionModel();
  ubicacion = new UbicacionModel();
  listaDepartamento: any[];
  listaMunicipio: any[];
  valido = true;
  listaTelefonos: Array<TelModel> = [];
  listaTel: Array<TelefonoModel> = [];
  deptoSel: any = [];
  muniSel: any = [];
  editarCampos = false;
  editar = false;

  //filtramos los representantes
  repre = new PersonaNaturalModel();
  listaRepresentante: any[];
  filterPost = '';
  duiRepre = 'DUI'
  nombreRepre = 'Nombre de representante';
  //filtro y paginacion del representante
  page = 1;

  constructor(public dialogRef: MatDialogRef<EmpresaAddComponent>, @Inject(MAT_DIALOG_DATA) public message: string,
  private fb: FormBuilder, public personaService: PersonaService) {
    this.llenarRepresentantes();
    this.crearFormulario();
  }

  ngOnInit(): void {

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

  llenarRepresentantes() {
    this.personaService.listarPersonas().subscribe((lista: any) => {
      this.listaRepresentante = lista.body;
    });
  }

  guardar() {
    if (this.forma.invalid) {
      console.log('Campos invalidos');
    }

    this.crearFormulario();
  }

  deptoSeleccionado(depto) {
    this.personaService.listarMunicipioPorDepto(depto.codigo).subscribe((lista: any) => {
      this.listaMunicipio = lista.body;

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
