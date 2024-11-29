import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: []
})
export class ToastComponent  implements OnInit {

  constructor(private toastCtrl: ToastController) { }

  async showToast(message: string, duracion: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration: duracion,
      position: 'middle',
    });
    toast.present();
  }

  ngOnInit() {}

}
