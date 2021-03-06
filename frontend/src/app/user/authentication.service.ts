import { User } from './../models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

function parseJwt(token) {
  if (!token) {
    return null;
  }

  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  private _user: User = null;
  public redirectUrl: string;


  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires = new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }

    this._user$ = new BehaviorSubject<string>(parsedToken && parsedToken.username);
    if (this._user$.value !== null) {
      this.user = null;

    }
  }

  get user(): User {


    return this._user;
  }

  get users(): Observable<User[]> {
    return this.http
      .get(`/API/groups/users`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  set user(obj) {
    this.http.post('/API/finduser', { username: this._user$.value })
      .pipe(
        map((res: any) => {
          this._user = User.fromJSON(res);
          return true;
        })
      ).subscribe();
  }

  get user$() {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post('/API/users/login', { username, password })
      .pipe(
        map((res: any) => {

          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(username);
            this.user = null;
            return true;
          } else {
            return false;
          }
        })
      )
  }

  register(user: User): Observable<boolean> {
    return this.http.post('/API/users/register', user)
      .pipe(
        map((res: any) => {
          const token = res.token;
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(user.username);
            this.http.post('/API/finduser', { username: user.username })
              .pipe(
                map((res: any) => {
                  this._user = User.fromJSON(res);
                  return true;
                })
              ).subscribe();
            return true;
          } else {
            return false;
          }
        })
      )
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      setTimeout(() => this._user$.next(null));
    }
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`/API/users/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  updateUser(): Observable<boolean> {
    return this.http.post(`/API/users/userUpdate`, this._user)
      .pipe(
        map((item: any) => { return true; })

      );
  }
}
