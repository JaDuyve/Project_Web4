import { AuthenticationService } from './../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  public router: Router;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthenticationService) { }

  ngOnInit() {
    this.user = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this._authService.login(
      this.user.value.username, 
      this.user.value.password).subscribe(val => {
        if (val) {
          if (this._authService.redirectUrl) {
            this.router.navigateByUrl(this._authService.redirectUrl);
            this._authService.redirectUrl = undefined;
          }else {
            this.router.navigate(['/homepage']);
          }
        }
      }, err => this.errorMsg = err.json().message);
  }

}