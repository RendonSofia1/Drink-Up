import { Component, OnInit } from '@angular/core';
import { IonLabel, IonItem, IonButton, IonIcon, ModalController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, personOutline, trash } from 'ionicons/icons';
import { TablesModalComponent } from '../tables-modal/tables-modal.component';

@Component({
  selector: 'app-tables-item',
  standalone: true,
  templateUrl: './tables-item.component.html',
  styleUrls: ['./tables-item.component.scss'],
  imports: [IonIcon, IonButton, IonItem, IonLabel, ]
})
export class TablesItemComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { 
    addIcons({add,trash,pencil, personOutline});

  }

  async openModal(actionType: 'add' | 'edit') {
    const modal = await this.modalController.create({
      component: TablesModalComponent,
      componentProps: { modalType: actionType },
      initialBreakpoint: 0.5, 
      breakpoints: [0, 1],
      backdropDismiss: false 
    
    });
    await modal.present();
  }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta mesa se eliminará de la base de datos',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          cssClass: 'danger-button',
          handler: () => {
            console.log('Remove clicked');
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

}
