import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem } from '@ionic/angular/standalone';
import { ToolbarComponent } from "../../../components/toolbar/toolbar.component";
import { IonicModule } from '@ionic/angular';
import { CardCarritoComponent } from "../../../components/card-carrito/card-carrito.component";
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ToolbarComponent, CardCarritoComponent]
})
export class CarritoPage implements OnInit {
  listaProductos: any[] = [];
  totalCarrito: number = 0;
  constructor(private _carritoService:CarritoService) {
  }

  ngOnInit() {
    this._carritoService.carritoChange.subscribe((carrito) => {
      this.listaProductos = carrito;
      this.totalCarrito = this._carritoService.calcularTotal();
    });

    this._carritoService.cargarCarrito();
  }



}
