import { Component, OnInit } from '@angular/core';
import { IonCard, IonLabel, IonCardHeader, IonGrid, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonBadge, IonCardContent, IonList, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';


@Component({
  selector: 'app-card-pago',
  templateUrl: './card-pago.component.html',
  styleUrls: ['./card-pago.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonItem, IonList, IonCardContent, IonBadge, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonGrid, IonCardHeader, IonLabel, IonCard]
})
export class CardPagoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
