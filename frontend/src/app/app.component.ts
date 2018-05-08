import { User } from './models/user.model';
import { AuthenticationService } from './user/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthenticationService){

  }

  get currentUser(): Observable<any> {
    return this.authService.user$;
  }

  get username(): string {
    return this.authService.user$.value;
  }

  public geefGebruikersnaam(): string {
    return this.authService.user$.value;
  }
}
