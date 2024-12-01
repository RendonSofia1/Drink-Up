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
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  user:any;

  constructor(private alertCtrl: AlertController, private route: Router) {
    this.user = JSON.parse(localStorage.getItem('mesaUser') || '{}');
    console.log(this.user);
  }

  cerrarSesion() {
    localStorage.removeItem('mesaUser');
    this.route.navigate(['/home']);
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
