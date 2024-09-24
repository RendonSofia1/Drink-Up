import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-list-checkout',
  standalone: true,
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class ListCheckoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
