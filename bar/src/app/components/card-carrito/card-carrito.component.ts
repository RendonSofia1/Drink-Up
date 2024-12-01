import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AlertController,
  IonCard,
  IonItem,
  IonLabel,

  IonThumbnail, IonInput, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastComponent } from '../toast/toast.component';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline, trashBinOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-card-carrito',
  standalone: true,
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.scss'],
  imports: [IonCol, IonRow, IonIcon, IonButton, IonInput,
    CommonModule,
    IonCard,
    IonItem,
    IonThumbnail,
    IonLabel,
  ],
  providers: [ToastComponent]
})
export class CardCarritoComponent implements OnInit {
  @Input() producto: any;
  private toast = inject(ToastComponent);
  constructor(
    private _carritoService: CarritoService
  ) {
    addIcons({removeOutline,addOutline, trashBinOutline, trashOutline});
  }

  async actualizarCantidad(id: number, nuevaCantidad: number) {
    this._carritoService.actualizarCantidad(id, nuevaCantidad);
  }

  eliminarProducto(id: number) {
    this._carritoService.eliminarProducto(id);
  }

  ngOnInit() {
    
  }
}
