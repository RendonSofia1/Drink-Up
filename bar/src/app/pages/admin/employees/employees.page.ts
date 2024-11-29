import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ModalController,
  IonContent,
  IonList,
  IonIcon,
  IonSearchbar,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';
import { addIcons } from 'ionicons';
import { add, pencil, personOutline, trash } from 'ionicons/icons';
import { EmployeesModalComponent } from '../../../components/employees-modal/employees-modal.component';
import { EmployeesItemComponent } from '../../../components/employees-item/employees-item.component';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonSearchbar,
    IonIcon,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    EmployeesItemComponent,
  ],
})
export class EmployeesPage implements OnInit {
  listaEmpleados: any[] = [];
  constructor(
    private modalController: ModalController,
    private _empleadoServ: EmpleadoService
  ) {
    addIcons({ add, trash, pencil, personOutline });
    this._empleadoServ.getNewEmployee.subscribe((event: any) => {
      if (event.action === 'delete') {
        this.listaEmpleados = this.listaEmpleados.filter(emp => emp.idUsuario !== event.id);
      }
      if (event.action === 'add' || event.action === 'update') {
        this.obtenerEmpleados();
      }
    });
    this.obtenerEmpleados();
  }

  obtenerEmpleados(){
    this._empleadoServ.getEmpleados().subscribe((data: any) => {
      console.log(data);
      this.listaEmpleados = data.usuarios;
      console.log(this.listaEmpleados);
    });
  }
  async openModalAdd() {
    const modal = await this.modalController.create({
      component: EmployeesModalComponent,
      componentProps: { modalType: 'add' },
      initialBreakpoint: 0.85,
      // breakpoints: [0, 1],
      backdropDismiss: false,
    });
    await modal.present();
  }

  ngOnInit() {}
}
