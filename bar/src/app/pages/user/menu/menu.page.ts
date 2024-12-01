import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonLabel,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { cartOutline } from 'ionicons/icons';
import { BebidaService } from 'src/app/services/bebida.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ToastController } from '@ionic/angular';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonCardContent,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
  ],
  providers: [ToastComponent],
})
export class MenuPage implements OnInit {
  listaBebidas: any[] = [];
  private toast = inject(ToastComponent);
  constructor(
    private _bebidaService: BebidaService,
    private _carritoService: CarritoService,
  ) {
    addIcons({ cartOutline });
    this._bebidaService.getBebidas().subscribe((res: any) => {
      this.listaBebidas = res.bebidas;
    });
  }
  async agregarAlCarrito(drink: any) {
    const producto = {
      id: drink.idBebida,
      nombre: drink.nombreBebida,
      url: drink.url,
      precio: drink.precioBebida,
      cantidad: 1,
      total: drink.precioBebida,
    };
    this._carritoService.agregarAlCarrito(producto);
    await this.toast.showToast('Producto agregado al carrito','medium', 'top');
  }

  limpiarlocal(){
    this._carritoService.vaciarCarrito();
  }

  ngOnInit() {}
}
