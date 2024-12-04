import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
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
import { MesaService } from 'src/app/services/mesa.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
  standalone: true,
  imports: [
    IonText,
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
  listaPagoComandas: any[] = [];
  user: any;
  rol: number;
  selectedSegment: string = '';

  constructor(
    private _comandasService: ComandaService,
    private _loginService: LoginService,
    private _mesasService: MesaService,
    private _ticketService: TicketService
  ) {
    addIcons({ wine, notificationsCircle, chevronForwardOutline, wallet });
    this.user = this._loginService.getUser();
    this.rol = this.user.rol;
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
          }
        },
        (error: any) => {
          if (error.status === 404) this.listaBartenderComandas = [];
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
          if (error.status === 404) this.listaMeseroComandas = [];
        }
      );

      this.obtenerComandasPago();
    }
  }

  obtenerComandasPago() {
    const tickets: any[] = [];
    this._mesasService.getMesasByUser(this.user.idUsuario).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          const mesas = data.mesas;
          let procesadas = 0;
          mesas.forEach((mesa: any, index: number) => {
            this._comandasService
              .getComandasByMesaEstatus(mesa.idMesa, 4)
              .subscribe(
                (resp: any) => {
                  if (resp.statusCode === 200) {
                    const ticket = {
                      id: mesa.idMesa,
                      total: resp.comandas.reduce(
                        (sum: number, comanda: any) => sum + comanda.total,
                        0
                      ),
                      mesa: mesa.nombreMesa,
                      pago: resp.comandas[0].metodoPago || '',
                      comanda: resp.comandas,
                    };
                    tickets.push(ticket);
                    procesadas++;

                    if (procesadas === mesas.length) {
                      this.listaPagoComandas = tickets;
                    }
                  }
                },
                (error: any) => {
                  procesadas++;
                  if (procesadas === mesas.length) {
                    this.listaPagoComandas = tickets;
                  }
                }
              );
          });
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  trackById(index: number, item: any): number {
    return item.idComanda;
  }

  ngOnInit() {
    if (this.rol === 1) {
      this.selectedSegment = 'entrega';
    } else {
      this.selectedSegment = 'preparacion';
    }

    this._ticketService.cargarTicket();

    this.obtenerComandas();
    this._comandasService.comandaActualizada.subscribe(() => {
      this.obtenerComandas();
    });
  }
}
