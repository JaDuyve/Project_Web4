import { User } from './../../models/user.model';
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
  private selectedFile;
  private base64textString: string;

  constructor(private fb: FormBuilder, private router: Router, private _authenticationService: AuthenticationService) { }

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
      prof: 'false'
    });
  }



  private serverSideValidateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this._authenticationService
        .checkUserNameAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        )
    }
  }

  onSubmit() {

    if (this.selectedFile) {
      let file = this.selectedFile[0];

      if (file) {
        let reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);

      }

    } else {


      this._authenticationService
        .register(new User(this.user.value.username, this.user.value.prof , "", "", this.passwordControl.value))
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
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files;
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);


    this._authenticationService
      .register(new User(this.user.value.username, this.user.value.prof, this.base64textString, this.selectedFile[0].type, this.passwordControl.value))
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

  

  @HostBinding('class') classes = "ui container";


}
