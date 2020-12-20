import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PruebaComponent } from '../../../vistas/prueba/prueba.component';
import { ActivoFijoListComponent } from 'app/vistas/activo-fijo-list/activo-fijo-list.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',      redirectTo: 'user-profile' }, //por defecto va mostrar esta ruta en caso que la url este vacia
    { path: 'prueba',         component: PruebaComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'activofijo',  component: ActivoFijoListComponent },
];
