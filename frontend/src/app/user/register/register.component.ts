import { map } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;

  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, this.passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })
    });
  }

  private passwordValidator(length: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value.length < length ? {
        'passwordTooShort':
          { requiredLength: length, actualLength: control.value.length }
      } : null;
    };
  }

  private comparePasswords(control: AbstractControl): { [key: string]: any } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
  }

  private serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any}> => {
      return this._authenticationService
      .checkUserNameAvailability(control.value)
      .pipe(
        map(available => {
          if (available) {
            return null;
          } 
          return {userAlreadyExists: true};
        })
      )
    }
  }

}
