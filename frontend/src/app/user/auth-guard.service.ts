import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  private router: Router;

  constructor(private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.user$.getValue()) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

}
