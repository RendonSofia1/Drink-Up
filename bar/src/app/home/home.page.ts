import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonLabel,
  IonButton, IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { ToastComponent } from '../components/toast/toast.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MesaService } from '../services/mesa.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonSegmentButton, IonSegment,
    IonButton,
    IonLabel,
    IonInput,
    IonCol,
    IonRow,
    IonGrid,
    ReactiveFormsModule
  ],
  providers: [ToastComponent]
})

export class HomePage {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  nForm!: FormGroup;
  mesaForm!: FormGroup;
  private toast = inject(ToastComponent);

  selectedSegment: string = 'empleados';

  constructor(private _loginService:LoginService, private _mesasService:MesaService) {
    this.nForm = this.fb.group({
      idUsuario: [null, Validators.required],
      contrasena: ['', Validators.required],
    });

    this.mesaForm = this.fb.group({
      idMesa: [null, Validators.required],
    });

    
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  async login() {
    this._loginService.login(this.nForm.value).subscribe(
      (resp: any) => {
        if (resp && resp.statusCode === 200) {
          this._loginService.setUser(resp.usuario);
          this.router.navigate(['/tabs/cuenta'], { replaceUrl: true }).then(() => {
            window.location.reload();
          });
        }
      },
      (error: any) => {
        if (error.status === 500) {
          this.toast.showToast('Error interno del servidor. Intente nuevamente más tarde', 'danger', 'top');
        } else  {
          this.toast.showToast('Usuario o contraseña incorrectos', 'medium');
        }
      }
    );
    this.nForm.reset();
  }


  async loginMesa() {
    this._mesasService.getMesaById(this.mesaForm.value.idMesa).subscribe(
      (resp: any) => {
        if (resp && resp.statusCode === 200) {
          this._loginService.setMesaUser(resp.mesa);
          this.router.navigate(['/tabs/mesa'], { replaceUrl: true }).then(() => {
            window.location.reload();
          });
        }
      },
      (error: any) => {
        if (error.status === 500) {
          this.toast.showToast('Error interno del servidor. Intente nuevamente más tarde', 'danger', 'top');
        } else if (error.status === 404) {
          this.toast.showToast('No existe esta mesa', 'medium');
        } else {
          this.toast.showToast('Ocurrió un error inesperado', 'medium', 'top');
        }
      }
    )
    this.mesaForm.reset();
  }

}
