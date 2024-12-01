import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
  standalone: true,
  imports: [
    IonCardSubtitle,
    IonButton,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
  ],
})
export class CuentaPage implements OnInit {
  user: any;

  constructor(
    private route: Router,
    private _loginService: LoginService
  ) {
    this.user = this._loginService.getUser();
    console.log(this.user);
  }



  cerrarSesion() {
    this._loginService.logout();
    this.route.navigate(['/home']);
  }


  ngOnInit() {}
}
