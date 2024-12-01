import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
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
export class CuentaPage implements OnInit {
  constructor(private alertCtrl: AlertController, private _route:Router) {}


  cerrarSesion() {
    this._route.navigate(['/home']);
  }

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
          cssClass: 'danger-button',
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
