import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cart,
  peopleCircleOutline,
  personCircle,
  receiptOutline,
  restaurant,
  wineSharp,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';

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

  userSubscription: Subscription = Subscription.EMPTY;
  mesaUserSubscription: Subscription = Subscription.EMPTY;

  constructor() {
    addIcons({
      wineSharp,
      cart,
      receiptOutline,
      personCircle,
      restaurant,
      peopleCircleOutline,
    });

  }
  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const mesaUser = JSON.parse(localStorage.getItem('mesaUser') || '{}');
    if (user && user.rol !== undefined) {
      this.userType = this.getRoleName(user.rol);
    } else if (mesaUser) {
      this.userType = 'mesa';
    }
    console.log(this.userType);
    this.setTabs();
  }

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
          tab: 'mesa',
          icon: 'person-circle',
          label: 'Mesa',
          route: '/tabs/mesa',
        },
      ];
    } else if (this.userType === 'empleado') {
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

  getRoleName(rol: number): string {
    if (rol === 0)
      return 'administrator';
    return 'empleado';
  }
}
