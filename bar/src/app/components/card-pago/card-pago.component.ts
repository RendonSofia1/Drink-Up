import { Component, Input, OnInit } from '@angular/core';
import {
  IonCard,
  IonLabel,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonCardSubtitle,
  IonBadge,
  IonCardContent,
  IonList,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComandaService } from 'src/app/services/comanda.service';

@Component({
  selector: 'app-card-pago',
  templateUrl: './card-pago.component.html',
  styleUrls: ['./card-pago.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonList,
    IonCardContent,
    IonBadge,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonRow,
    IonGrid,
    IonCardHeader,
    IonLabel,
    IonCard,
    IonItem,
    CommonModule
  ],
})
export class CardPagoComponent implements OnInit {
  @Input() ticket: any;
  listaComandas:any[] = [];
  constructor(private route: Router, private _comandaService: ComandaService) {}

  ngOnInit() {
    if (this.ticket?.comanda) {
      this.listaComandas = this.ticket.comanda;
    }
    console.log(this.ticket.comanda);
  }

  actualizarComandas(metodoPago: string) {
    this.listaComandas.forEach((comanda) => {
      const body = {
        estatusComanda: 5,
        metodoPago: metodoPago,
      };
      this._comandaService
        .updateComanda(body, comanda.idComanda)
        .subscribe((resp: any) => {
          if (resp.statusCode === 200) console.log('Estatus actualizado');
        });
    });
  }
  OpenDatailOrden(id: number) {
    this.route.navigateByUrl(`/detail/${id}`);
  }
}
