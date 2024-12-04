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
  IonIcon, IonSearchbar } from '@ionic/angular/standalone';
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
  imports: [IonSearchbar,
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
  busquedaRealizada = false;
  private toast = inject(ToastComponent);
  constructor(
    private _carritoService: CarritoService,
    private _drinkService: BebidaService
  ) {
    addIcons({ cartOutline });
    this.obtenerBebidas();
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

  obtenerBebidas(){
    this._drinkService.getBebidas().subscribe((data: any) => {
      console.log(data);
      this.listaBebidas = data.bebidas;
    });
  }

  buscarBebidas(event: any) {
    const query = event.target.value?.trim();
    if (query) {
      this._drinkService.getBebidasByNombre(query).subscribe(
        (data: any) => {
          this.listaBebidas = data.bebidas;
          this.busquedaRealizada = true;
        },
        (error) => {
          this.listaBebidas = [];
          this.busquedaRealizada = true;
        }
      );
    } else {
      this.obtenerBebidas();
      this.busquedaRealizada = false;
    }
  }

  ngOnInit() {}
}
