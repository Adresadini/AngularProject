import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from '../helpers/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  hide = true;
  user: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.formBuilder.group(
      {
        email: [
          '',
          {
            validators: [
              Validators.compose([Validators.required, CustomValidators.email]),
            ],
          },
        ],
        password: [
          '',
          {
            validators: [
              Validators.compose([
                Validators.required,
                CustomValidators.passwordLength(6),
                CustomValidators.password,
              ]),
            ],
            updateOn: 'blur',
          },
        ],
        passwordConfirmation: [
          '',
          {
            validators: [Validators.compose([Validators.required])],
            updateOn: 'blur',
          },
        ],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
      },

      {
        validator: this.mustMatch('password', 'passwordConfirmation'),
      }
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onRegistration() {
    if (
      this.email.invalid ||
      this.password.invalid ||
      this.passwordConfirmation.value != this.password.value ||
      this.lastName.invalid ||
      this.firstName
    ) {
      this.openErrorSnackBar();
      return;
    }

    this.user = this.registerForm.value;
    this.addUser(this.user);

    this.openSuccessSnackBar();
  }

  addUser(user) {
    let users = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users'));
      users = [user, ...users];
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(users));
  }

  openSuccessSnackBar() {
    this._snackBar.open('Register Successful!', '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
      duration: 3000,
    });
  }

  openErrorSnackBar() {
    this._snackBar.open('Register Failed! Check fields and try again.', '', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      duration: 3000,
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get passwordConfirmation() {
    return this.registerForm.get('passwordConfirmation');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
}
