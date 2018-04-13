import { AuthenticationService } from './../authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
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
            this.router.navigate(['/homepage/list']);
          }
        }
      }, err => this.errorMsg = err.json().message);
  }

  // @HostBinding('class') classes = "ui container"; 
}