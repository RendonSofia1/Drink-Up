import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCard,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.page.html',
  styleUrls: ['./mesa.page.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
  ],
})
export class MesaPage implements OnInit {
  user: any;

  constructor(
    private alertCtrl: AlertController,
    private route: Router,
    private toast: ToastController,
    private _carritoServ: CarritoService,
  ) {

  }

  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Introduzca la clave',
      inputs: [
        {
          name: 'clave',
          type: 'password',
          placeholder: 'Clave de seguridad',
        },
      ],
      buttons: [
        {
          cssClass: 'danger-button',
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Ok',
          cssClass: 'tertiary',
          handler: (data) => {
            if (data.clave !== '1234') {
              this.toast
                .create({
                  message: 'Clave incorrecta',
                  duration: 2000,
                  color: 'danger',
                  position:'middle',
                })
                .then((t) => t.present());
              return;
            }
            this._carritoServ.vaciarCarrito();
            localStorage.removeItem('mesaUser');
            this.route.navigate(['/home'], { replaceUrl: true });
          },
        },
      ],
    });
    await alert.present();
  }
  ngOnInit() {
    localStorage.removeItem('user');
    this.user = JSON.parse(localStorage.getItem('mesaUser') || '{}');
    console.log(this.user);
  }
}
