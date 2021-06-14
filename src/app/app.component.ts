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
    AppComponent.nullUser = JSON.stringify('');
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
    AppComponent.show = false;
  }

  onLogout() {
    AppComponent.show = false;
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
  }

  get logoutShow() {
    return AppComponent.show;
  }
}
