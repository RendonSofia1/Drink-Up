import { Component, inject, Input, OnInit } from '@angular/core';
import { IonLabel, IonItem, IonButton, IonIcon, ModalController, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pencil, personOutline, trash } from 'ionicons/icons';
import { TablesModalComponent } from '../tables-modal/tables-modal.component';
import { MesaService } from 'src/app/services/mesa.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-tables-item',
  standalone: true,
  templateUrl: './tables-item.component.html',
  styleUrls: ['./tables-item.component.scss'],
  imports: [IonIcon, IonButton, IonItem, IonLabel, ],
  providers: [ToastComponent],
})
export class TablesItemComponent  implements OnInit {
  @Input() table: any;
  private toast = inject(ToastComponent);

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private _mesaServ: MesaService
  ) {
    addIcons({add,trash,pencil, personOutline});

  }

  async openModalEdit(objeto:any) {
    const modal = await this.modalController.create({
      component: TablesModalComponent,
      componentProps: { modalType: 'edit',  mesaEdit: objeto },
      initialBreakpoint: 0.5,
      backdropDismiss: false

    });
    await modal.present();
  }

  async presentDeleteAlert(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta mesa se eliminará de la base de datos',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'ELIMINAR',
          role: 'destructive',
          cssClass: 'danger-button',
          handler: async () => {
            console.log('Remove clicked');
            try {
              const resp = await this._mesaServ.deleteMesa(id);
              console.log(resp);
              this._mesaServ.emitMesaEliminado(id);
              await this.toast.showToast('Mesa eliminada exitosamente');
            } catch (err) {
              console.error('Error al eliminar mesa:', err);
              await this.toast.showToast('Error al eliminar', 4000);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

}
