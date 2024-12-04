import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import {
  AlertController,
  ModalController,
  IonCard,
  IonItem,
  IonLabel,
  IonButton,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { BebidaService } from 'src/app/services/bebida.service';
import { CommonModule } from '@angular/common';
import { DrinkModalComponent } from '../drink-modal/drink-modal.component';

@Component({
  selector: 'app-drink-item',
  standalone: true,
  templateUrl: './drink-item.component.html',
  styleUrls: ['./drink-item.component.scss'],
  imports: [IonButton, IonLabel, IonItem, IonCard, IonThumbnail, CommonModule],
  providers: [ToastComponent],
})
export class DrinkItemComponent implements OnInit {
  @Input() drink: any;
  private toast = inject(ToastComponent);
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private _bebidasSev: BebidaService
  ) {}

  async openModalEdit(objeto:any) {
    const modal = await this.modalController.create({
      component: DrinkModalComponent,
      componentProps: { modalType: 'edit',  bebidaEdit: objeto },
      initialBreakpoint: 0.6,
      backdropDismiss: false

    });
    await modal.present();
  }

  async presentDeleteAlert(id: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta bebida se eliminará de la base de datos',
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
            this._bebidasSev.deleteBebida(id).subscribe((response:any) => {
              if (response.statusCode === 200) {
                this._bebidasSev.setBebidaEliminado(id);
                this.toast.showToast('Bebida eliminada exitosamente');
              } else {
                this.toast.showToast('Error al eliminar');
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
