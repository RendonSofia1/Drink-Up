import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonModal, IonGrid, IonLabel, IonInput, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonSearchbar, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { ToolbarComponent } from "../../../components/toolbar/toolbar.component";
import { addIcons } from 'ionicons';
import { add, pencil, personOutline, trash } from 'ionicons/icons';
import { EmployeesModalComponent } from '../../../components/employees-modal/employees-modal.component';
import { EmployeesItemComponent } from "../../../components/employees-item/employees-item.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonSearchbar, IonIcon, IonItem, IonList, IonInput, IonLabel, IonGrid, IonModal, IonRow, IonCol, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ToolbarComponent, IonSelect, IonSelectOption, EmployeesItemComponent]
})
export class EmployeesPage implements OnInit {
  constructor(
    private modalController: ModalController,
  ) {
    addIcons({ add, trash, pencil, personOutline });
  }
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
  
  ngOnInit() {
  }

}
