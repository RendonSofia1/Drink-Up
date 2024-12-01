import { Component, inject, Input, OnInit } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModalController,
  IonCol,
  IonRow,
  IonGrid,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { BebidaService } from 'src/app/services/bebida.service';

@Component({
  selector: 'app-drink-modal',
  standalone: true,
  templateUrl: './drink-modal.component.html',
  styleUrls: ['./drink-modal.component.scss'],
  imports: [
    IonButton,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    ReactiveFormsModule,
  ],
  providers: [ToastComponent],
})
export class DrinkModalComponent implements OnInit {
  @Input() modalType!: 'add' | 'edit';
  @Input() bebidaEdit!: any;
  private fb = inject(FormBuilder);
  nForm!: FormGroup;
  private toast = inject(ToastComponent);

  constructor(
    private modalController: ModalController,
    private _drinkServ: BebidaService
  ) {
    this.nForm = this.fb.group({
      nombreBebida: ['', Validators.required],
      precioBebida: ['', Validators.required],
      url: ['', Validators.required],
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
        this._drinkServ
          .updateBebida(this.nForm.value, this.bebidaEdit.idBebida)
          .subscribe({
            next: async (resp) => {
              console.log(resp);
              this._drinkServ.setNewBebida(resp);
              await this.toast.showToast('Bebida actualizada exitosamente');
              this.dismissModal();
            },
            error: async (err) => {
              console.error(err);
              await this.toast.showToast('Error al actualizar la Bebida');
            },
          });
      } else {
        // Lógica para crear un nuevo empleado
        this._drinkServ.newBebida(this.nForm.value).subscribe({
          next: async (resp) => {
            console.log(resp);
            this._drinkServ.setNewBebida(resp);
            await this.toast.showToast('Bebida guardada exitosamente');
            this.dismissModal();
          },
          error: async (err) => {
            console.error(err);
            await this.toast.showToast('Error al guardar la Bebida');
          },
        });
      }
    } catch (err) {
      console.error(err);
      await this.toast.showToast('Ocurrió un error inesperado');
    }
  }

  restrictDecimals(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    if (value.includes('.')) {
      const [integer, decimal] = value.split('.');
      value = decimal.length > 2 ? `${integer}.${decimal.slice(0, 2)}` : value;
    }
    input.value = value;
  }


  ngOnInit() {
    if (this.modalType === 'edit' && this.bebidaEdit) {
      this.nForm.patchValue({
        nombreBebida: this.bebidaEdit.nombreBebida,
        precioBebida: this.bebidaEdit.precioBebida,
        url: this.bebidaEdit.url,
      });
    }
  }
}
