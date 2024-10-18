import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonFabButton,
  IonSearchbar,
  IonFab,
  IonIcon,
  IonLabel,
  IonItem,
  IonButton,
  IonModal,
  IonGrid,
  IonRow,
  IonCol,
  ModalController,
  AlertController,
  IonCard,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { add, pencil, trash, person, personOutline } from 'ionicons/icons';
import { TablesItemComponent } from "../../../components/tables-item/tables-item.component";
import { TablesModalComponent } from '../../../components/tables-modal/tables-modal.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonModal,
    IonButton,
    IonItem,
    IonLabel,
    IonIcon,
    IonFab,
    IonSearchbar,
    IonFabButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonSelect,
    IonSelectOption,
    TablesItemComponent
],
})
export class TablesPage implements OnInit {
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
