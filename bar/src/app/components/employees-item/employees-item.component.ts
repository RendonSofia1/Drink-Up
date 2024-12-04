import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalController, AlertController, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { EmployeesModalComponent } from '../employees-modal/employees-modal.component';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-employees-item',
  standalone: true,
  templateUrl: './employees-item.component.html',
  styleUrls: ['./employees-item.component.scss'],
  imports: [IonIcon, IonButton, IonLabel, IonItem,],
  providers: [ToastComponent]
})
export class EmployeesItemComponent implements OnInit {
  @Input() empleado: any;
  private toast = inject(ToastComponent);
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private _empleadoServ: EmpleadoService,
  ) {

  }

  async openModalEdit(empleado:any) {
    const modal = await this.modalController.create({
      component: EmployeesModalComponent,
      componentProps: { modalType: 'edit',  empleadoEdit: empleado },
      initialBreakpoint: 0.85,
      // breakpoints: [0, 1],
      backdropDismiss: false

    });
    await modal.present();
  }

  async presentDeleteAlert(idUsuario: number) {
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      message: 'Esta empleado se eliminará de la base de datos',
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
            this._empleadoServ.deleteEmpleado(idUsuario).subscribe((response:any)=>{
              if (response.statusCode === 200) {
                this._empleadoServ.setEmpleadoEliminado(idUsuario);
                this.toast.showToast('Empleado eliminado exitosamente');
              } else{
                this.toast.showToast('Error al eliminar');
                console.log(response);
              }

            })
          },
        },
      ],
    });

    await alert.present();
  }


  getRoleString(role: number): string {
    const roles: { [key: number]: string } = {
      0: 'Administrador',
      1: 'Mesero',
      2: 'Bartender',
    };
    return roles[role] || 'Desconocido';
  }


  ngOnInit() { }

}
