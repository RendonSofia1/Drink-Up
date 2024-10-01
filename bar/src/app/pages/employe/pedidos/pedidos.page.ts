import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonSegment,
  IonTitle,
  IonToolbar,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonText,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  notificationsCircle,
  wallet,
  wine,
} from 'ionicons/icons';
import { CardPagoComponent } from 'src/app/components/card-pago/card-pago.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonItem,
    IonList,
    IonText,
    IonBadge,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonIcon,
    IonLabel,
    IonSegmentButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonSegment,
    CardPagoComponent
  ],
})
export class PedidosPage implements OnInit {
  constructor() {
    addIcons({ wine, notificationsCircle, chevronForwardOutline, wallet });
  }

  selectedSegment: string = 'pago';

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {}
}
