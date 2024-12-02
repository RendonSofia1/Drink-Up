import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonListHeader, IonLabel, IonItem, IonThumbnail, IonBadge, IonButton } from '@ionic/angular/standalone';
import { ComandaService } from 'src/app/services/comanda.service';

@Component({
  selector: 'app-list-comanda',
  templateUrl: './list-comanda.component.html',
  styleUrls: ['./list-comanda.component.scss'],
  standalone: true,
  imports: [IonButton, IonBadge, IonItem, IonLabel, IonListHeader, IonList, IonThumbnail]
})
export class ListComandaComponent  implements OnInit {
  @Input() comanda: any;
  listaDetalleComanda:any[] = [];
  constructor( private _comandaService:ComandaService) {

  }

  cambiarEstatusComanda(idComanda: number, estatus: number) {
    const body = {
      estatusComanda: estatus + 1,
      metodoPago: ''
    };
    this._comandaService.updateComanda(body, idComanda).subscribe((resp:any) => {
      if (resp.statusCode === 200)
        console.log('Estatus actualizado');
        
    })
  }

  ngOnInit() {
    if (this.comanda?.detalleComanda) {
      this.listaDetalleComanda = this.comanda.detalleComanda;
    }
  }

}
