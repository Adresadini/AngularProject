import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  hide = true;
  loginFormInstance: FormGroup = new FormGroup({});
  remember = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginFormInstance = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
    this.loadRemember();
  }

  loadRemember() {
    if (
      localStorage.getItem('RememberUser') &&
      JSON.parse(localStorage.getItem('RememberUser')) !== ''
    ) {
      let user = JSON.parse(localStorage.getItem('RememberUser'));
      this.loginFormInstance = this.formBuilder.group({
        email: [user.email, Validators.required],
        password: [user.password, Validators.required],
        rememberMe: [user.rememberMe],
      });
      this.remember = user.rememberMe;
    } else {
      localStorage.setItem('RememberUser', JSON.stringify(''));
    }
  }

  checkRemember(user) {
    if (user.rememberMe) {
      localStorage.setItem('RememberUser', JSON.stringify(user));
    } else {
      localStorage.setItem('RememberUser', JSON.stringify(''));
    }
  }

  onLogin() {
    let user = this.loginFormInstance.value;
    this.checkUser(user);
  }

  checkUser(user) {
    let users = [];
    let ok = false;
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users.forEach((value) => {
        if (value.email === user.email && value.password === user.password) {
          ok = true;
          localStorage.setItem('ConnectedUser', JSON.stringify(value.email));
          user.rememberMe = this.remember;
          this.checkRemember(user);
          this.router.navigateByUrl('/home');
          this.openSuccessSnackBar();
        }
      });
      if (!ok) {
        this.openErrorSnackBar();
      }
    } else {
      this.openErrorSnackBar();
    }
  }

  openSuccessSnackBar() {
    this._snackBar.open('Login Successful!', '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
      duration: 3000,
    });
  }

  openErrorSnackBar() {
    this._snackBar.open('Login Failed! E-mail or password incorrect.', '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      duration: 3000,
    });
  }

  onRegister() {
    this.router.navigateByUrl('/register');
  }

  get email() {
    return this.loginFormInstance.get('email');
  }

  get password() {
    return this.loginFormInstance.get('password');
  }

  get rememberMe() {
    return this.loginFormInstance.get('rememberMe');
  }

  set remenberMe(newValue) {
    this.loginFormInstance.patchValue({ rememberMe: newValue });
  }
}
