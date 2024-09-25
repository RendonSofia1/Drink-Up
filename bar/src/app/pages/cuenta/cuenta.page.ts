import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonCardSubtitle,
  IonLabel,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonCardSubtitle,
    IonButton,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ToolbarComponent,
  ],
})
export class CuentaPage implements OnInit {
  constructor(private alertCtrl: AlertController) {}

  async showAlert() {
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
          cssClass: 'warning',
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Ok',
          cssClass: 'tertiary',
          handler: (data) => {
            console.log('Aceptado', data);
          },
        },
      ],
    });
    await alert.present();
  }
  ngOnInit() {}
}
