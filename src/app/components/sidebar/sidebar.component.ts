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
    { path: '/table-list', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: '/typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: '/icons', title: 'Icons',  icon: 'bubble_chart', class: '' }, 
    { path: '/creditopersonal', title: 'Crédito Personal',  icon: 'perm_identity', class: '' },
    { path: '/creditoempresa', title: 'Crédito Empresarial',  icon: 'account_balance', class: '' },    
    { path: '/activofijo', title: 'Activo Fijo',  icon: 'style', class: '' },
    { path: '/politicas', title: 'Políticas',  icon: 'privacy_tip', class: '' },
    { path: '/clientes', title: 'Clientes',  icon: 'supervisor_account', class: '' },
    { path: '/notifications', title: 'Notifications',  icon: 'notifications', class: '' },

]; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
