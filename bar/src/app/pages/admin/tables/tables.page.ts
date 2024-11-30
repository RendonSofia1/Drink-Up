import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonFabButton,
  IonSearchbar,
  IonFab,
  IonIcon,
  ModalController,
  AlertController,
  IonList,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { add, pencil, trash, person, personOutline } from 'ionicons/icons';
import { TablesItemComponent } from "../../../components/tables-item/tables-item.component";
import { TablesModalComponent } from '../../../components/tables-modal/tables-modal.component';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonIcon,
    IonFab,
    IonSearchbar,
    IonFabButton,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    TablesItemComponent
],
})
export class TablesPage implements OnInit {
  listaMesas: any[] = [];
  constructor(
    private modalController: ModalController,
    private _mesasServ: MesaService,
  ) {
    addIcons({add,trash,pencil, personOutline});
    this._mesasServ.getNewMesa.subscribe((event: any) => {
      if (event.action === 'delete') {
        this.listaMesas = this.listaMesas.filter(emp => emp.idMesa !== event.id);
      }
      if (event.action === 'add' || event.action === 'update') {
        this.obtenerMesas();
      }
    });
    this.obtenerMesas();
  }
  async openModalAdd() {
    const modal = await this.modalController.create({
      component: TablesModalComponent,
      componentProps: { modalType: 'add' },
      initialBreakpoint: 0.6,
      // breakpoints: [0, 1],
      backdropDismiss: false,
    });
    await modal.present();
  }

  obtenerMesas(){
    this._mesasServ.getMesas().subscribe((data: any) => {
      this.listaMesas = data.mesas;
      console.log(this.listaMesas);
    });
  }

  ngOnInit() {}
}
