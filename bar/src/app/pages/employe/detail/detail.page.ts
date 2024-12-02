import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { ListCheckoutComponent } from '../../../components/list-checkout/list-checkout.component';
import { ActivatedRoute } from '@angular/router';
import { ComandaService } from 'src/app/services/comanda.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ListCheckoutComponent,
  ],
})
export class DetailPage implements OnInit {
  id!: number;
  comanda:any[] = [];
  constructor(
    private route: ActivatedRoute,
    private _comandaService: ComandaService
  ) {

  }

  obtenerComanda() {
    this._comandaService.getComandaById(this.id).subscribe((data: any) => {
      if (data.statusCode === 200) {
        this.comanda = data.comandaFind;
        console.log('Comanda cargada:', this.comanda);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        console.log('ID recibido:', this.id);
      }
    });
    this.obtenerComanda();
  }
}
