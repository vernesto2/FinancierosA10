import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DireccionModel } from 'app/models/direccion.model';
import { PersonaModel } from 'app/models/persona.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { TelModel } from 'app/models/tel.model';
import { TelefonoModel } from 'app/models/telefono.model';
import { TelefonoPKModel } from 'app/models/telefonoPKModel.model';
import { UbicacionModel } from 'app/models/ubicacion.model';
import { PersonaService } from 'app/services/persona.service';
declare var $: any;

@Component({
  selector: 'app-persona-add',
  templateUrl: './persona-add.component.html',
  styleUrls: ['./persona-add.component.css']
})
export class PersonaAddComponent implements OnInit {

  @Output() onAgregado = new EventEmitter();

  forma: FormGroup;
  persona = new PersonaModel();
  personaNatural = new PersonaNaturalModel();
  direccion = new DireccionModel();
  ubicacion = new UbicacionModel();
  listaDepartamento: any[];
  listaMunicipio: any[];
  valido = true;
  listaTelefonos: Array<TelModel>;
  listaTel: Array<TelefonoModel> = [];

  //agregando la fecha minima y maxima para validar los datepicker
  minDate: Date;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<PersonaAddComponent>, @Inject(MAT_DIALOG_DATA) public data: PersonaNaturalModel,
  private fb: FormBuilder, public personaService: PersonaService) {
    //lleno el formulario cuando selecciono el de editar
    this.crearFormulario();
    this.listarDepartamentos();
    if (data != null) {
      
      this.personaNatural = data;
      //saco los 2 numeros del codigo para determinar el depto
      //this.deptoSeleccionado(this.personaNatural.persona.direccion.ubicacion.codigo.toString().substring(0, 2));
      console.log(this.personaNatural);
      //this.listaTel = this.personaNatural.persona.telefonos;
      console.log(this.listaTel);
      //this.forma.setValue(this.personaNatural);
      this.llenarFormulario();
      this.valido = false;
    }

    //seteando las fechas minimas y maximas
    const currentYear = new Date().getFullYear(); //obtenemos el año actual
    const currentDay = new Date().getDate(); //sacamos los dias actuales
    const currentMonth = new Date().getMonth(); // aqui obtenemos el mes, pero inicia desde 0
    //console.log(currentYear + '-' + currentMonth + '-' + currentDay );
    //                      2021 - 65 = 1956, mes       0,  dia    2  fecha minima que se mostrara
    // -- aqui estamos indicando que la persona tiene que tener al menos 65 años de edad como maximo para hacer un credito
    this.minDate = new Date(currentYear - 65, currentMonth, currentDay);
    //                      2021 - 18 = 2003, mes       0,  dia    2  fecha maxima que se mostrara
    // -- con esto estamos validando que la persona tiene que ser mayor de 18 años
    this.maxDate = new Date(currentYear - 18 , currentMonth, currentDay);
  }

  ngOnInit(): void {

  }

  listarDepartamentos() {
    this.personaService.listarDepartamento().subscribe((lista: any) => {
      this.listaDepartamento = lista.body;
    });
  }

  llenarFormulario() {
    // si usamos el .setValue tenemos que mandar el caparazon del obj completo en cambio si usamos
    // .reset no importa sino va completa la estructura del obj
    this.forma.reset({
      nit: this.personaNatural.nit,
      direccion: this.personaNatural.persona.direccion.direccion,
      ubicacion: this.personaNatural.persona.direccion.ubicacion,

      dui: this.personaNatural.dui,
      nombres: this.personaNatural.nombres,
      apellidos: this.personaNatural.apellidos,
      estadoCivil: this.personaNatural.estadoCivil,
      genero: this.personaNatural.genero,
      fechaNacimiento: this.personaNatural.fechaNacimiento,

      
    });

    // de esta forma podria llenar el array
    //['Comer', 'Dormir'].forEach( valor => this.pasatiempos.push( this.fb.control(valor) ));
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
            tipoContacto: ['', []],
            telefono: ['', [Validators.minLength(8), Validators.maxLength(8)]]
          })
      ]),
    }, {
      validators: []
    });
  }

  guardar() {
    if (this.forma.invalid) {
      this.showNotification('bottom', 'left', 'Registro cancelado', 'cancel', 'warning');
    } else {
      this.separarModelos();
      this.personaService.agregarPersona(this.personaNatural).subscribe((res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.showNotification('top', 'right', 'Agregado Correctamente.!', 'save', 'success');
          this.onAgregado.emit();
        } else {
          this.showNotification('bottom', 'right', 'Ocurrio un problema.!', 'cancel', 'danger');
        }
      });
    }
  }

  separarModelos() {
    //Direccion
    this.direccion.direccion = this.forma.get('direccion').value;
    //Ubicacion
    this.ubicacion = this.forma.get('ubicacion').value;
    this.direccion.ubicacion = this.ubicacion;

    //Persona
    this.persona.nit = this.forma.get('nit').value;
    this.persona.tipoPersona = 'PERSONA';
    this.persona.direccion = this.direccion;

    //PersonaNatural
    this.personaNatural.nit = this.forma.get('nit').value;
    this.personaNatural.dui = this.forma.get('dui').value;
    this.personaNatural.nombres = this.forma.get('nombres').value;
    this.personaNatural.apellidos = this.forma.get('apellidos').value;
    this.personaNatural.estadoCivil = this.forma.get('estadoCivil').value;
    this.personaNatural.fechaNacimiento = this.forma.get('fechaNacimiento').value;
    this.personaNatural.genero = this.forma.get('genero').value;
    this.personaNatural.persona = this.persona;

    //Telefonos
    this.listaTelefonos = this.telefonos.value;
    if (this.listaTelefonos.length > 0) {
      for (let i = 0; i < this.listaTelefonos.length; i++) {
        let tel = new TelefonoModel();
        let telPk = new TelefonoPKModel();
        telPk.nit = this.persona.nit;
        telPk.telefono = this.listaTelefonos[i].telefono;
        tel.id = telPk;
        tel.tipoContacto = this.listaTelefonos[i].tipoContacto;
        //console.log(tel);
        this.listaTel.push(tel);
      }
      this.persona.telefonos = this.listaTel;
      //console.log(this.listaTel);
    }
  }

  deptoSeleccionado(depto) {
    console.log(depto);
    this.personaService.listarMunicipioPorDepto(depto.codigo).subscribe((lista: any) => {
      this.listaMunicipio = lista.body;
      if (this.listaMunicipio.length > 0) {
        this.valido = false;
      } else {
        this.valido = true;
      }
    });
  }

  showNotification(from, align, message, icon, type) {
    $.notify({
        icon: icon,
        message: message

    }, {
        type: type,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-3 col-lg-3 col-11 col-sm-3 col-md-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">' + icon + '</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  agregarTelefonos() {
    this.telefonos.push(
      this.fb.group({
        tipoContacto: ['', []],
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
