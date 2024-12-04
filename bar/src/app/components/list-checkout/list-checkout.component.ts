import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IonBadge, IonItem, IonLabel, IonThumbnail, IonItemDivider, IonItemGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'app-list-checkout',
  standalone: true,
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.scss'],
  imports: [IonItemGroup, IonItemDivider, CommonModule, IonItem, IonLabel, IonBadge, IonThumbnail],
})
export class ListCheckoutComponent implements OnChanges {
  @Input() comanda: any;
  listaDetalleComanda: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['comanda'] && this.comanda?.detalleComanda) {
      this.listaDetalleComanda = this.comanda.detalleComanda;
    }
  }

  asignarEstado(estado: number): { text: string; color: string } {
    switch (estado) {
      case 1:
        return { text: 'En preparación', color: 'medium' };
      case 2:
        return { text: 'Por entregar', color: 'warning' };
      case 3:
        return { text: 'Entregado', color: 'success' };
      default:
        return { text: 'Finalizado', color: 'dark' };
    }
  }
}
