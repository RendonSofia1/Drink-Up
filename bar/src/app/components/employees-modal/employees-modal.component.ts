import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonSelect, IonSelectOption,IonGrid, IonRow, IonCol, IonLabel, IonInput, IonList, IonItem, IonButton, IonModal } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees-modal',
  standalone: true,
  templateUrl: './employees-modal.component.html',
  styleUrls: ['./employees-modal.component.scss'],
  imports: [IonModal, FormsModule, IonSelect, IonSelectOption,IonButton, IonItem, IonList, IonInput, IonLabel, IonCol, IonRow, IonGrid, ]
})
export class EmployeesModalComponent  implements OnInit {
  @Input() modalType!: 'add' | 'edit';
  employeeData: { name: string; role: string } = { name: '', role: '' };

  constructor(private modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  save() {
    console.log(this.employeeData);
    this.dismissModal();
  }

  ngOnInit() {}

}
