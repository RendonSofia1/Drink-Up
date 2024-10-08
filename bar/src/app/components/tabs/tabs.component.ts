import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cart, peopleCircleOutline, personCircle, receiptOutline, restaurant, wineSharp } from 'ionicons/icons';

interface Tab {
  tab: string;
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
  ],
})
export class TabsComponent implements OnInit {
  userType: string = '';
  tabs: Tab[] = [];

  constructor() {
    addIcons({ wineSharp, cart, receiptOutline, personCircle, restaurant, peopleCircleOutline });
    this.userType = 'administrador';
    this.setTabs();
  }

  ngOnInit() {}

  setTabs() {
    if (this.userType === 'mesa') {
      this.tabs = [
        { tab: 'menu', icon: 'wine-sharp', label: 'Menú', route: '/tabs/menu' },
        {
          tab: 'carrito',
          icon: 'cart',
          label: 'Carrito',
          route: '/tabs/carrito',
        },
        {
          tab: 'checkout',
          icon: 'receipt-outline',
          label: 'Checkout',
          route: '/tabs/checkout',
        },
        {
          tab: 'cuenta',
          icon: 'person-circle',
          label: 'Cuenta',
          route: '/tabs/cuenta',
        },
      ];
    } else if (this.userType === 'mesero') {
      this.tabs = [
        {
          tab: 'pedidos',
          icon: 'wine-sharp',
          label: 'Pedidos',
          route: '/tabs/pedidos',
        },
        {
          tab: 'cuenta',
          icon: 'person-circle',
          label: 'Cuenta',
          route: '/tabs/cuenta',
        },
      ];
    } else if (this.userType === 'administrador') {
      this.tabs = [
        {
          tab: 'drinks',
          icon: 'wine-sharp',
          label: 'Drinks',
          route: '/tabs/drinks',
        },
        {
          tab: 'tables',
          icon: 'restaurant',
          label: 'Mesas',
          route: '/tabs/tables',
        },
        {
          tab: 'employees',
          icon: 'people-circle-outline',
          label: 'Empleados',
          route: '/tabs/employees',
        },
        {
          tab: 'cuenta',
          icon: 'person-circle',
          label: 'Cuenta',
          route: '/tabs/cuenta',
        },
      ];
    }
  }
}
