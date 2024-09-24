import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cart, personCircle, receiptOutline, wineSharp } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports:[IonicModule, RouterLink, RouterLinkActive]
})
export class TabsComponent  implements OnInit {

  constructor() {
    addIcons({wineSharp, cart, receiptOutline, personCircle})
  }

  ngOnInit() {}

}
