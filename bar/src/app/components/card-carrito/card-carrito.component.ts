import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-card-carrito',
  standalone: true,
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class CardCarritoComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
