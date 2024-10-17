import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonModal, IonGrid, IonLabel, IonInput, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonSearchbar, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ToolbarComponent } from "../../../components/toolbar/toolbar.component";
import { addIcons } from 'ionicons';
import { add, pencil, personOutline, trash } from 'ionicons/icons';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonSearchbar, IonIcon, IonItem, IonList, IonInput, IonLabel, IonGrid, IonModal, IonRow, IonCol, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonSelect, IonSelectOption]
})
export class EmployeesPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    addIcons({ add, trash, pencil, personOutline });
  }

  dismissModal() {
    this.modalController.dismiss();
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
  ngOnInit() {
  }

}
