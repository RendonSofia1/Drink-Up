import { Component, inject, Input, OnInit } from '@angular/core';
import { IonLabel, IonItem, IonButton, IonIcon, ModalController, AlertController, IonBadge } from '@ionic/angular/standalone';
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
  imports: [IonBadge, IonIcon, IonButton, IonItem, IonLabel, ],
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
            this._mesaServ.deleteMesa(id).subscribe((response:any) => {
              if (response.statusCode === 200) {
                this._mesaServ.emitMesaEliminado(id);
                this.toast.showToast('Mesa eliminada exitosamente');
              } else {
                this.toast.showToast('Error al eliminar', 'danger');
              }
              console.log(response);
            })
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit() {}

}
