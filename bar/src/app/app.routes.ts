import { Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'menu',
        loadComponent: () =>
          import('./pages/user/menu/menu.page').then((m) => m.MenuPage),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./pages/user/carrito/carrito.page').then(
            (m) => m.CarritoPage
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/user/checkout/checkout.page').then(
            (m) => m.CheckoutPage
          ),
      },
      {
        path: 'cuenta',
        loadComponent: () =>
          import('./pages/cuenta/cuenta.page').then((m) => m.CuentaPage),
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/employe/pedidos/pedidos.page').then(
            (m) => m.PedidosPage
          ),
      },
      {
        path: 'drinks',
        loadComponent: () =>
          import('./pages/admin/drinks/drinks.page').then((m) => m.DrinksPage),
      },
    ],
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('./pages/employe/detail/detail.page').then((m) => m.DetailPage),
  },
];
