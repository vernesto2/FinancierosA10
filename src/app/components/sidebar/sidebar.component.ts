import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/creditopersonal', title: 'Crédito Personal',  icon: 'perm_identity', class: '' },
    { path: '/creditoempresa', title: 'Crédito Empresarial',  icon: 'account_balance', class: '' },
    { path: '/politicas', title: 'Políticas',  icon: 'privacy_tip', class: '' },
    { path: '/clientes-persona', title: 'Clientes (Personas)',  icon: 'supervisor_account', class: '' },
    { path: '/clientes-empresa', title: 'Clientes (Empresas)',  icon: 'supervisor_account', class: '' },
    { path: '/activofijo', title: 'Activo Fijo',  icon: 'style', class: '' },
    { path: '/usuario', title: 'Usuario',  icon: 'style', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() { }

  ngOnInit() {
    let usuario = {
      tipoUsuario: 'Admin'
    }
    for (let i = 0; i < ROUTES.length; i++) {
      if (usuario.tipoUsuario == "Admin" && (i < 8)) {
        this.menuItems.push(ROUTES[i]);
      }
    }
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
    //console.log(ROUTES.length);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
