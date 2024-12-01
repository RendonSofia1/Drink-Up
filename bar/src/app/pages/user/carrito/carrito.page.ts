import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { IonicModule } from '@ionic/angular';
import { CardCarritoComponent } from '../../../components/card-carrito/card-carrito.component';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComandaService } from 'src/app/services/comanda.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { DetalleComandaService } from 'src/app/services/detalle-comanda.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    CardCarritoComponent,
  ],
  providers: [ToastComponent],
})
export class CarritoPage implements OnInit {
  private toast = inject(ToastComponent);
  listaProductos: any[] = [];
  totalCarrito: number = 0;
  mesa: any;
  constructor(
    private _carritoService: CarritoService,
    private _comandaService: ComandaService,
    private _detalleService: DetalleComandaService
  ) {
    this.mesa = JSON.parse(localStorage.getItem('mesaUser') || '{}');

  }

  async hacerComanda() {
    let idComanda: number;
    const body = {
      fkIdMesa: this.mesa.idMesa,
      total: this.totalCarrito,
    };
    this._comandaService.newComanda(body).subscribe(
      (resp: any) => {
        if (resp && resp.statusCode === 200) {
          idComanda = resp.newComanda.idComanda;
          this.detallerComanda(idComanda);
        }
      },
      (error) => {
        this.toast.showToast('Error al realizar el pedido');
        console.log(error);
        return;
      }
    );
  }

  detallerComanda(idComanda: number) {
    this.listaProductos.forEach((producto) => {
      const bodyp = {
        fkIdBebida: producto.id,
        fkIdComanda: idComanda,
        cantidad: producto.cantidad,
        precio: producto.precio * producto.cantidad,
      };

      this._detalleService.newDetalleComanda(bodyp).subscribe(
        (resp: any) => {
          if (resp.statusCode === 200) {
            console.log('Detalle de comanda creado');
            this._carritoService.eliminarProducto(producto.id);
          }
        },
        (error) => {
          console.log(error);
          this.toast.showToast('Error al realizar el pedido');
          return;
        }
      );
    });
  }

  ngOnInit() {
    this._carritoService.carritoChange.subscribe((carrito) => {
      this.listaProductos = carrito;
      this.totalCarrito = this._carritoService.calcularTotal();
    });

    this._carritoService.cargarCarrito();
  }
}
