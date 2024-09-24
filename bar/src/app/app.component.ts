import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonToolbar, IonTitle, IonHeader, IonContent, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
