import { Component, inject, Input, OnInit } from '@angular/core';
import {
  ModalController,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastComponent } from '../toast/toast.component';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-tables-modal',
  standalone: true,
  templateUrl: './tables-modal.component.html',
  styleUrls: ['./tables-modal.component.scss'],
  imports: [
    FormsModule,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonInput,
    IonLabel,
    IonCol,
    IonRow,
    IonGrid,
    ReactiveFormsModule
  ],
  providers: [ToastComponent]
})
export class TablesModalComponent implements OnInit {
  @Input() modalType!: 'add' | 'edit';
  @Input() mesaEdit!: any;
  private fb = inject(FormBuilder);
  nForm!: FormGroup;
  private toast = inject(ToastComponent);

  listaMeseros: any[] = [];

  constructor(
    private modalController: ModalController,
    private _empleadoServ: EmpleadoService,
    private _mesaServ: MesaService
  ) {
    this._empleadoServ.getEmpleadosByRol(1).subscribe((data:any) => {
      this.listaMeseros = data.usuarios;
      console.log(this.listaMeseros);
    })

    this.nForm = this.fb.group({
      nombreMesa: ['', Validators.required],
      fkIdUsuario: ['', Validators.required],
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async save() {
    if (!this.nForm.valid) {
      await this.toast.showToast('Por favor complete todos los campos');
      return;
    }
    try {
      if (this.modalType === 'edit') {
        // Lógica para actualizar al empleado
        console.log(this.mesaEdit.idMesa);
        this._mesaServ
          .updateMesa(this.mesaEdit.idMesa, this.nForm.value)
          .subscribe({
            next: async (resp) => {
              console.log(resp);
              this._mesaServ.emitNewMesa(resp);
              await this.toast.showToast('Mesa actualizada exitosamente');
              this.dismissModal();
            },
            error: async (err) => {
              console.error(err);
              await this.toast.showToast('Error al actualizar la mesa');
            },
          });
      } else {
        // Lógica para crear un nuevo empleado
        this._mesaServ.newMesa(this.nForm.value).subscribe({
          next: async (resp) => {
            console.log(resp);
            this._mesaServ.emitNewMesa(resp);
            await this.toast.showToast('Mesa guardada exitosamente');
            this.dismissModal();
          },
          error: async (err) => {
            console.error(err);
            await this.toast.showToast('Error al guardar la mesa');
          },
        });
      }
    } catch (err) {
      console.error(err);
      await this.toast.showToast('Ocurrió un error inesperado');
    }
  }

  ngOnInit() {
    if (this.modalType === 'edit' && this.mesaEdit) {
      this.nForm.patchValue({
        nombreMesa: this.mesaEdit.nombreMesa,
        fkIdUsuario: this.mesaEdit.fkIdUsuario,
      });
    }
  }
}
