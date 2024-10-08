import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonAvatar,
  IonItem,
  IonButton,
  IonLabel,
  IonThumbnail,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonInput,
  IonButtons,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  ModalController,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonButtons,
    IonInput,
    IonModal,
    IonIcon,
    IonFabButton,
    IonFab,
    IonLabel,
    IonButton,
    IonItem,
    IonAvatar,
    IonCard,
    IonSearchbar,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonThumbnail,
  ],
})
export class DrinksPage implements OnInit {


  constructor(private modalController: ModalController) {
    addIcons({ add });
  }

  dismissModal() {
    this.modalController.dismiss();
  }


  ngOnInit() {}
}
