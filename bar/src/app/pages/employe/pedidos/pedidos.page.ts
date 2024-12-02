import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon, IonText } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import {
  chevronForwardOutline,
  notificationsCircle,
  wallet,
  wine,
} from 'ionicons/icons';
import { CardPagoComponent } from 'src/app/components/card-pago/card-pago.component';
import { ListComandaComponent } from '../../../components/list-comanda/list-comanda.component';
import { ComandaService } from 'src/app/services/comanda.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [IonText,
    IonIcon,
    IonLabel,
    IonSegmentButton,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonSegment,
    CardPagoComponent,
    ListComandaComponent,
  ],
})
export class PedidosPage implements OnInit {
  listaBartenderComandas: any[] = [];
  listaMeseroComandas: any[] = [];
  user: any;
  rol: number;
  selectedSegment: string = '';

  constructor(
    private _comandasService: ComandaService,
    private _loginService: LoginService
  ) {
    addIcons({ wine, notificationsCircle, chevronForwardOutline, wallet });
    this.user = this._loginService.getUser();
    this.rol = this.user.rol;
    console.log(this.rol);
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  obtenerComandas() {
    if (this.rol === 2) {
      this._comandasService.getComandasByStatus(1).subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.listaBartenderComandas = data.comandas;
            console.log(this.listaBartenderComandas);
          }
        },
        (error: any) => {
          if (error.status === 404)
            this.listaBartenderComandas = [];
          else console.log(error);
        }
      );
    }
    if (this.rol === 1) {
      this._comandasService.getComandasByUser(this.user.idUsuario, 2).subscribe(
        (data: any) => {
          if (data.statusCode === 200) {
            this.listaMeseroComandas = data.comandas;
            console.log(this.listaMeseroComandas);
          }
        },
        (error: any) => {
          if (error.status === 404)
            this.listaMeseroComandas = [];
          else console.log(error);
        }
      );
    }
  }

  ngOnInit() {
    if(this.rol === 1){
      this.selectedSegment = 'entrega';
    } else {
      this.selectedSegment = 'preparacion';
    }
    this.obtenerComandas();
    this._comandasService.comandaActualizada.subscribe(() => {
      this.obtenerComandas();
    });
  }
}
