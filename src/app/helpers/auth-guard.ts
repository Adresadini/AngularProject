import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AppComponent } from '@app/app.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('ConnectedUser') == AppComponent.nullUser) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
