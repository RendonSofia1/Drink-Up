import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonBadge, IonItem, IonLabel, IonList, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-list-checkout',
  standalone: true,
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.scss'],
  imports: [ CommonModule, IonList, IonItem,IonLabel, IonBadge, IonThumbnail]
})
export class ListCheckoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
