import { Component, OnInit } from '@angular/core';
import { IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonBadge, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-list-comanda',
  templateUrl: './list-comanda.component.html',
  styleUrls: ['./list-comanda.component.scss'],
  standalone: true,
  imports: [IonButton, IonBadge, IonItem, IonLabel, IonListHeader, IonList, IonThumbnail]
})
export class ListComandaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
