import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(route, state: RouterStateSnapshot):
  | Observable<boolean>
  | Promise<boolean>
  | boolean
  | UrlTree {
  // logged in, so return true
  return this.auth.appUser$
  .pipe(map(appUser => appUser.isAdmin))
 
}
}
