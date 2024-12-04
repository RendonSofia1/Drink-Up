import { Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';
import { authGuard } from './guards/auth.guard';

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
        canActivate: [authGuard],
        data: { role: [0, 1, 2] },
      },
      {
        path: 'pedidos',
        loadComponent: () =>
          import('./pages/employe/pedidos/pedidos.page').then(
            (m) => m.PedidosPage
          ),
        canActivate: [authGuard],
        data: { role: [1, 2] },
      },
      {
        path: 'drinks',
        loadComponent: () =>
          import('./pages/admin/drinks/drinks.page').then((m) => m.DrinksPage),
        canActivate: [authGuard],
        data: { role: 0 },
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./pages/admin/tables/tables.page').then((m) => m.TablesPage),
        canActivate: [authGuard],
        data: { role: 0 },
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./pages/admin/employees/employees.page').then(
            (m) => m.EmployeesPage
          ),
        canActivate: [authGuard],
        data: { role: 0 },
      },
      {
        path: 'mesa',
        loadComponent: () =>
          import('./pages/user/mesa/mesa.page').then((m) => m.MesaPage),
      },
    ],
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./pages/employe/detail/detail.page').then((m) => m.DetailPage),
  },
  {
    path: 'denegado',
    loadComponent: () =>
      import('./pages/denegado/denegado.page').then((m) => m.DenegadoPage),
  },
];
