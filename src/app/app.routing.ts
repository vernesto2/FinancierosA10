import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './componentesAntiguos/layouts/admin-layout/admin-layout.component';
import { BlankComponent } from './components/blank/blank.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './componentesAntiguos/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }, { path: 'reporte',      component: BlankComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
