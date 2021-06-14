import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  static nullUser: string;

  constructor(public router: Router) {
    AppComponent.nullUser = JSON.stringify('');
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
  }

  onLogout() {
    localStorage.setItem('ConnectedUser', AppComponent.nullUser);
  }
}
