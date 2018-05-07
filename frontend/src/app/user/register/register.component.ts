import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './../authentication.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Component, OnInit, HostBinding } from '@angular/core';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? {
      'passwordTooShort':
        { requiredLength: length, actualLength: control.value.length }
    } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;
  private selectedFile = null;

  constructor(private fb: FormBuilder, private router: Router,  private _authenticationService:AuthenticationService) { }

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords }),
      prof: ''
    });
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

  onSubmit() {
    console.log(this.user.value.prof);
    this._authenticationService
      .register(this.user.value.username, this.passwordControl.value, this.user.value.prof)
      .subscribe(
        val => {
          if (val) {
            this.router.navigate(['/homepage/list']);
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to register user ${this.user.value.username}: ${
            error.error
          }`;
        }
      );
  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  @HostBinding('class') classes = "ui container"; 


}
