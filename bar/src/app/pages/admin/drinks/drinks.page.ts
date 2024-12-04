import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  ModalController,
  AlertController, IonText } from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { DrinkModalComponent } from 'src/app/components/drink-modal/drink-modal.component';
import { BebidaService } from 'src/app/services/bebida.service';
import { DrinkItemComponent } from 'src/app/components/drink-item/drink-item.component';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
  standalone: true,
  imports: [IonText,
    IonIcon,
    IonFabButton,
    IonFab,
    IonSearchbar,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    DrinkItemComponent
  ],
})
export class DrinksPage implements OnInit {
  listaBebidas: any[] = [];
  busquedaRealizada = false;
  constructor(
    private modalController: ModalController,
    private _drinkService:BebidaService,
  ) {
    addIcons({ add });
    this._drinkService.getNewDrink.subscribe((event: any) => {
      if (event.action === 'delete') {
        this.listaBebidas = this.listaBebidas.filter(emp => emp.idBebida !== event.id);
      }
      if (event.action === 'add' || event.action === 'update') {
        this.obtenerBebidas();
      }
    });
    this.obtenerBebidas();

  }

  obtenerBebidas(){
    this._drinkService.getBebidas().subscribe((data: any) => {
      console.log(data);
      this.listaBebidas = data.bebidas;
    });
  }

  buscarBebidas(event: any) {
    const query = event.target.value?.trim();
    if (query) {
      this._drinkService.getBebidasByNombre(query).subscribe(
        (data: any) => {
          this.listaBebidas = data.bebidas;
          this.busquedaRealizada = true;
        },
        (error) => {
          this.listaBebidas = [];
          this.busquedaRealizada = true;
        }
      );
    } else {
      this.obtenerBebidas();
      this.busquedaRealizada = false;
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }


  async openModalAdd() {
    const modal = await this.modalController.create({
      component: DrinkModalComponent,
      componentProps: { modalType: 'add' },
      initialBreakpoint: 0.6,
      // breakpoints: [0, 1],
      backdropDismiss: false,
    });
    await modal.present();
  }

  ngOnInit() {}
}
