import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRoute, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from "./auth-service";


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return true;
    return this.authService.isAuthenticated();
  }
}