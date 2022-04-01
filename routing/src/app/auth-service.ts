import { resolve } from "path";
import { Observable, of, timer } from "rxjs";
import { map } from "rxjs/operators";

export class AuthService {
  loggedIn = false;

  isAuthenticated(): Observable<boolean> {
    return timer(3000).pipe(map(_ => this.loggedIn))
  }

  logIn () {
    this.loggedIn = true;
  }

  logOut () {
    this.loggedIn = false;
  }
}