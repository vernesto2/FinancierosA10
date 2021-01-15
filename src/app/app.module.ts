import { PruebaComponent } from './vistas/prueba/prueba.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

//Componente Principal
import { AdminLayoutComponent } from './componentesAntiguos/layouts/admin-layout/admin-layout.component';

//imports del modulo de imports de AngularMaterial
import { MaterialModule } from './material/material.module';

//imports de terceros
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ActivoFijoAddComponent } from './vistas/activo-fijo-add/activo-fijo-add.component';
import { ActivoFijoListComponent } from './vistas/activo-fijo-list/activo-fijo-list.component';
import { PoliticasAddComponent } from './vistas/politicas-add/politicas-add.component';
import { PoliticasListComponent } from './vistas/politicas-list/politicas-list.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
import {NgxPaginationModule} from 'ngx-pagination';
import { PersonaAddComponent } from './vistas/persona-add/persona-add.component';
import { EmpresaAddComponent } from './vistas/empresa-add/empresa-add.component';
import { TelefonoPipe } from './pipes/telefono.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { DuiPipe } from './pipes/dui.pipe';
import { CreditoEmpresaAddComponent } from './vistas/credito-empresa-add/credito-empresa-add.component';
import { PrecreditoAddComponent } from './vistas/precredito-add/precredito-add.component';
import { NitPipe } from './pipes/nit.pipe';
import { EmpresaListComponent } from './vistas/empresa-list/empresa-list.component';
import { PersonaListComponent } from './vistas/persona-list/persona-list.component';
import { RazonesFinancierasComponent } from './vistas/razones-financieras/razones-financieras.component';
import { RazonesComponent } from './reportes/razones/razones.component';
import { UsuarioListComponent } from './vistas/usuario-list/usuario-list.component';
import { UsuarioAddComponent } from './vistas/usuario-add/usuario-add.component';
import { LoginComponent } from './vistas/login/login.component';
import { DetalleBajaActivoComponent } from './vistas/detalle-baja-activo/detalle-baja-activo.component';
import { ProyeccionesComponent } from './vistas/proyecciones/proyecciones.component';
<<<<<<< HEAD
import { ContratoPersonaComponent } from './reportes/contrato-persona/contrato-persona.component';
import { RefinanciarComponent } from './vistas/refinanciar/refinanciar.component';
=======
import { CobroComponent } from './vistas/cobro/cobro.component';
import { DepreamorComponent } from './vistas/depreamor/depreamor.component';
>>>>>>> 836209d647320a454ef675d77428b2f2450f6a45

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ActivoFijoAddComponent,
    ActivoFijoListComponent,
    PoliticasAddComponent,
    PoliticasListComponent,
    PersonaAddComponent,
    EmpresaAddComponent,
    TelefonoPipe,
    NitPipe,
    EdadPipe,
    DuiPipe,
    PrecreditoAddComponent,
    CreditoEmpresaAddComponent,
    EmpresaListComponent,
    PersonaListComponent,
    RazonesFinancierasComponent,
    RazonesComponent,
    UsuarioListComponent,
    UsuarioAddComponent,
    LoginComponent,
    DetalleBajaActivoComponent,
    ProyeccionesComponent,
<<<<<<< HEAD
    ContratoPersonaComponent,
    RefinanciarComponent,
=======
    CobroComponent,
    DepreamorComponent,
>>>>>>> 836209d647320a454ef675d77428b2f2450f6a45
  ],
  entryComponents: [
    ActivoFijoAddComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
