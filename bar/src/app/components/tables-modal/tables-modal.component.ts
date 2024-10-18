import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonSelect, IonSelectOption,IonGrid, IonRow, IonCol, IonLabel, IonInput, IonList, IonItem, IonButton, IonModal } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tables-modal',
  standalone: true,
  templateUrl: './tables-modal.component.html',
  styleUrls: ['./tables-modal.component.scss'],
  imports: [IonModal, FormsModule, IonSelect, IonSelectOption,IonButton, IonItem, IonList, IonInput, IonLabel, IonCol, IonRow, IonGrid, ]
})
export class TablesModalComponent  implements OnInit {
  @Input() modalType!: 'add' | 'edit';
  tableData: { name: string; waiter: string } = { name: '', waiter: '' };

  constructor(private modalController: ModalController) { }

  dismissModal() {
    this.modalController.dismiss();
  }

  save() {
    console.log(this.tableData);
    this.dismissModal();
  }

  ngOnInit() {}

}
