import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AppComponent } from '@app/app.component';

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(private _router: Router, private _snackBar: MatSnackBar) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //check some condition
    if (localStorage.getItem('ConnectedUser') !== AppComponent.nullUser) {
      this._router.navigateByUrl('home');
      this.openErrorSnackBar();
      return false;
    }
    return true;
  }

  openErrorSnackBar() {
    this._snackBar.open('Please logout to proceed!', '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      duration: 3000,
    });
  }
}
