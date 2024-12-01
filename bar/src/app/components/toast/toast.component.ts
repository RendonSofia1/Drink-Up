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

  async showToast(message: string, color: string = 'dark', position: 'top' | 'bottom' | 'middle' = 'middle') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: position,
      color:color,
    });
    toast.present();
  }

  ngOnInit() {}

}
