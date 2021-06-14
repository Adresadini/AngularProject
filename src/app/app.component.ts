import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  static nullUser: string;
  static show: boolean;

  constructor() {
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
    AppComponent.show = false;
    AppComponent.nullUser = JSON.stringify(null);
  }

  onLogout() {
    AppComponent.show = false;
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
  }

  get logoutShow() {
    return AppComponent.show;
  }
}
