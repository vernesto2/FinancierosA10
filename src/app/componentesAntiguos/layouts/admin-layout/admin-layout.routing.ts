import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ActivoFijoListComponent } from 'app/vistas/activo-fijo-list/activo-fijo-list.component';
import { PoliticasListComponent } from 'app/vistas/politicas-list/politicas-list.component';
import { PersonaEmpresaListComponent } from 'app/vistas/persona-empresa-list/persona-empresa-list.component';
import { PrecreditoAddComponent } from 'app/vistas/precredito-add/precredito-add.component';
import { CreditoEmpresaAddComponent } from 'app/vistas/credito-empresa-add/credito-empresa-add.component';

export const AdminLayoutRoutes: Routes = [
    { path: '',      redirectTo: 'activofijo' }, //por defecto va mostrar esta ruta en caso que la url este vacia
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'activofijo',  component: ActivoFijoListComponent },
    { path: 'clientes',  component: PersonaEmpresaListComponent },
    { path: 'politicas',  component: PoliticasListComponent },
    { path: 'creditopersonal',  component: PrecreditoAddComponent },
    { path: 'creditoempresa',  component: CreditoEmpresaAddComponent },
];
