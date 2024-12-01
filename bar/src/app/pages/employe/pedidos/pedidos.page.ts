import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
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
import { ListComandaComponent } from "../../../components/list-comanda/list-comanda.component";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonLabel,
    IonSegmentButton,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonSegment,
    CardPagoComponent,
    ListComandaComponent],
})
export class PedidosPage implements OnInit {
  constructor() {
    addIcons({ wine, notificationsCircle, chevronForwardOutline, wallet });
  }

  selectedSegment: string = 'preparacion';

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {}
}
