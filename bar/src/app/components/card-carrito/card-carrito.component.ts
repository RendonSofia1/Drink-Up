import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonCard, IonItem, IonLabel, IonSelect, IonSelectOption, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card-carrito',
  standalone: true,
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.scss'],
  imports: [ CommonModule, IonCard, IonItem, IonThumbnail, IonLabel, IonSelect, IonSelectOption]
})
export class CardCarritoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
