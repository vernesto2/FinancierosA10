import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DireccionModel } from 'app/models/direccion.model';
import { EmpresaModel } from 'app/models/empresa.model';
import { PersonaModel } from 'app/models/persona.model';
import { PersonaNaturalModel } from 'app/models/personaNatural.model';
import { TelModel } from 'app/models/tel.model';
import { TelefonoModel } from 'app/models/telefono.model';
import { TelefonoPKModel } from 'app/models/telefonoPKModel.model';
import { UbicacionModel } from 'app/models/ubicacion.model';
import { PersonaService } from 'app/services/persona.service';
declare var $: any;

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
  empresa = new EmpresaModel();
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
  duiRepre = 'DUI'
  nombreRepre = 'Nombre de representante';
  //filtro y paginacion del representante
  page = 1;

  constructor(public dialogRef: MatDialogRef<EmpresaAddComponent>, @Inject(MAT_DIALOG_DATA) public data: EmpresaModel,
  private fb: FormBuilder, public personaService: PersonaService) {
    this.crearFormulario();

    if (data != null) {
      this.editar = true;
      this.empresa = data;
      this.editarCampos = true;
    }
  }

  ngOnInit(): void {
    this.llenarRepresentantes();
    this.listarDepartamentos();
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nit: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],

      direccion: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],

      nombre: ['', [Validators.required, Validators.minLength(3)]],
      telefonos: this.fb.array([
          this.fb.group({
          tipoContacto: ['', ],
          telefono: ['', [Validators.minLength(8), Validators.maxLength(8)]]
        })
      ]),
    }, {
      validators: []
    });
  }

  separarModelos() {
    //Direccion
    this.direccion.direccion = this.forma.get('direccion').value;
    //Ubicacion
    this.ubicacion = this.forma.get('ubicacion').value;
    this.direccion.ubicacion = this.ubicacion;

    //Persona
    this.persona.nit = this.forma.get('nit').value;
    this.persona.tipoPersona = 'EMPRESA';
    this.persona.direccion = this.direccion;

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
        this.listaTel.push(tel);
      }
      //console.log(this.listaTelefonos);
      this.persona.telefonos = this.listaTel;

      //empresa
      this.empresa.nit = this.forma.get('nit').value;
      this.empresa.personaNatural = this.repre;
      this.empresa.nombre = this.forma.get('nombre').value;
      this.empresa.persona = this.persona;
      //console.log(this.listaTel);
    }
    //console.log(this.personaNatural);
  }

  llenarRepresentantes() {
    this.personaService.listarPersonas().subscribe((lista: any) => {
      this.listaRepresentante = lista.body;
    });
  }

  seleccionoRepresentante(repre: PersonaNaturalModel) {
    this.duiRepre = repre.dui;
    this.nombreRepre = repre.nombres + ' ' + repre.apellidos;
    this.repre = repre;
  }

  guardar() {
    if (this.forma.invalid) {
      console.log('Campos invalidos');
    } else {
      //console.log(this.personaNatural);
      if (this.editar) { //si es verdadero EDITAMOS

      } else { //Si es falso AGREGAMOS
        this.separarModelos();
        //console.log(this.repre);
        //console.log(this.empresa);
        this.personaService.agregarEmpresa(this.empresa).subscribe((res: any) => {
          if (res.status == 200) {
            this.showNotification('top', 'right', 'Agregado Correctamente.!', 'save', 'success');
            this.onAgregado1.emit();
          } else {
            this.showNotification('bottom', 'right', 'Ocurrio un problema.!', 'cancel', 'danger');
          }
        });
      }
    }
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

  listarDepartamentos() {
    this.personaService.listarDepartamento().subscribe((lista: any) => {
      this.listaDepartamento = lista.body;
    });
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
