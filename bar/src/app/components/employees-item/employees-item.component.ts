import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { EmployeesModalComponent } from '../employees-modal/employees-modal.component';

@Component({
  selector: 'app-employees-item',
  standalone: true,
  templateUrl: './employees-item.component.html',
  styleUrls: ['./employees-item.component.scss'],
  imports: [IonIcon, IonButton, IonLabel, IonItem,]
})
export class EmployeesItemComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  async openModal(actionType: 'add' | 'edit') {
    const modal = await this.modalController.create({
      component: EmployeesModalComponent,
      componentProps: { actionType },
      initialBreakpoint: 0.5, 
      breakpoints: [0, 1],
      backdropDismiss: false 
    
    });
    await modal.present();
  }
  
  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta empleado se eliminará de la base de datos',
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

  ngOnInit() { }

}
