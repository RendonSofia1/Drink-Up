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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-employees-modal',
  standalone: true,
  templateUrl: './employees-modal.component.html',
  styleUrls: ['./employees-modal.component.scss'],
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
    ReactiveFormsModule,
  ],
  providers: [ToastComponent],
})
export class EmployeesModalComponent implements OnInit {
  @Input() modalType!: 'add' | 'edit';
  @Input() empleadoEdit!: any;
  private fb = inject(FormBuilder);
  nForm!: FormGroup;
  private toast = inject(ToastComponent);
  // employeeData: { name: string; role: string } = { name: '', role: '' };

  constructor(
    private modalController: ModalController,
    private _empleadoServ: EmpleadoService
  ) {
    this.nForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: ['', Validators.required],
      contrasena: ['', Validators.required],
      rol: [0, Validators.required],
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  //falta poner la logica cuando se edita
  async save() {
    if (!this.nForm.valid) {
      await this.toast.showToast('Por favor complete todos los campos');
      return;
    }

    try {
      if (this.modalType === 'edit') {
        // Lógica para actualizar al empleado
        this._empleadoServ
          .updateEmpleado(this.nForm.value, this.empleadoEdit.idUsuario)
          .subscribe({
            next: async (resp) => {
              console.log(resp);
              this._empleadoServ.setNewEmpleado(resp);
              await this.toast.showToast('Empleado actualizado exitosamente');
              this.dismissModal();
            },
            error: async (err) => {
              console.error(err);
              await this.toast.showToast('Error al actualizar el empleado');
            },
          });
      } else {
        // Lógica para crear un nuevo empleado
        this._empleadoServ.newEmpleado(this.nForm.value).subscribe({
          next: async (resp) => {
            console.log(resp);
            this._empleadoServ.setNewEmpleado(resp);
            await this.toast.showToast('Empleado guardado exitosamente');
            this.dismissModal();
          },
          error: async (err) => {
            console.error(err);
            await this.toast.showToast('Error al guardar el empleado');
          },
        });
      }
    } catch (err) {
      console.error(err);
      await this.toast.showToast('Ocurrió un error inesperado');
    }
  }

  ngOnInit() {
    if (this.modalType === 'edit' && this.empleadoEdit) {
      this.nForm.patchValue({
        nombreUsuario: this.empleadoEdit.nombreUsuario,
        apellidoPat: this.empleadoEdit.apellidoPat,
        apellidoMat: this.empleadoEdit.apellidoMat,
        contrasena: this.empleadoEdit.contrasena,
        rol: this.empleadoEdit.rol,
      });
    }
  }
}
