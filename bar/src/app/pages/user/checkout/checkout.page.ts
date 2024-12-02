import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { ListCheckoutComponent } from '../../../components/list-checkout/list-checkout.component';
import { ComandaService } from 'src/app/services/comanda.service';
import {
  AlertController,
  ToastController,
  IonList,
  IonContent,
  IonButton,
  IonListHeader,
  IonBadge,
  IonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonBadge,
    IonListHeader,
    IonButton,
    IonContent,
    IonList,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    ListCheckoutComponent,
  ],
  providers: [ToastComponent],

})
export class CheckoutPage implements OnInit {
  listaComandas: any[] = [];
  mesa: any;
  pagar: number = 0;
  total: number = 0;
  constructor(
    private alertCtrl: AlertController,
    private _comandaService: ComandaService,
    private toast: ToastComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.mesa = JSON.parse(localStorage.getItem('mesaUser') || '{}');
    this.obtenerComandas();
    this._comandaService.comandaActualizada.subscribe(() => {
      this.obtenerComandas();
    });
  }

  obtenerComandas() {
    this._comandaService.getComandasByMesa(this.mesa.idMesa).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          this.listaComandas = data.comandas;
          console.log(this.listaComandas);
          this.verificarComandas();
        }
      },
      (error: any) => {
        if (error.status === 404){
          this.listaComandas = [];
          this.verificarComandas();
        }
        else console.log(error);
      }
    );
  }

  openPagar() {
    if (this.pagar === 0) {
      this.toast.showToast('No se han realizado pedidos');
    } else if (this.pagar === 1) {
      this.toast.showToast('Algunas comandas no están listas', 'warning', 'bottom');
    } else if (this.pagar === 2) {
      this.openAlert();
    }
  }

  async openAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Selecciona el método de pago',
      inputs: [
        {
          name: 'paymentMethod',
          type: 'radio',
          label: 'Débito',
          value: 'debito',
        },
        {
          name: 'paymentMethod',
          type: 'radio',
          label: 'Efectivo',
          value: 'efectivo',
        },
        {
          name: 'paymentMethod',
          type: 'radio',
          label: 'Crédito',
          value: 'credito',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger-button',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Método de pago seleccionado:', data);
            this.actualizarComandas(data);
            this.showSecondAlert();
          },
        },
      ],
    });
    await alert.present();
  }

  actualizarComandas(metodoPago: string) {
    this.listaComandas.forEach((comanda) => {
      const body = {
        estatusComanda: 4,
        metodoPago: metodoPago,
      };
      this._comandaService
        .updateComanda(body, comanda.idComanda)
        .subscribe((resp: any) => {
          if (resp.statusCode === 200) console.log('Estatus actualizado');
        });
    });
  }

  verificarComandas() {
    if (this.listaComandas.length === 0) {
      this.pagar = 0; // No hay comandas
    } else if (this.listaComandas.every((comanda) => comanda.estatusComanda === 3)) {
      this.pagar = 2; // Todas listas para pagar
    } else {
      this.pagar = 1; // Algunas comandas no están listas
    }

    this.total = this.listaComandas.reduce(
      (suma, comanda) => suma + (comanda.total || 0),
      0
    );
  }

  async showSecondAlert() {
    const meseroAlert = await this.alertCtrl.create({
      header: '¡Gracias por su preferencia!',
      message: 'El mesero llegará a la mesa en breve para realizar el cobro',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/tabs/menu']);
          }
        },
      ],
    });
    await meseroAlert.present();
  }
}
