import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: any;
  static show: boolean;

  constructor() {
    AppComponent.show = false;
  }

  onLogout() {
    this.user = null;
    AppComponent.show = false;
  }

  get logoutShow() {
    return AppComponent.show;
  }
}
