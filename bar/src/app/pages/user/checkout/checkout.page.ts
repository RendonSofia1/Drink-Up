import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { IonicModule, AlertController } from '@ionic/angular';
import { ListCheckoutComponent } from "../../../components/list-checkout/list-checkout.component";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ToolbarComponent, ListCheckoutComponent]
})
export class CheckoutPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  async openPagar() {
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
          value: 'efectivo'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger-button',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Método de pago seleccionado:', data);
          }
        }
      ]
    });
    await alert.present();
  }

}
