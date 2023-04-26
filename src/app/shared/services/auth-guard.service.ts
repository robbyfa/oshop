import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private auth: AuthService, private router:Router) { }
 
  canActivate(route, state: RouterStateSnapshot):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  // logged in, so return true
  return this.auth.user$.pipe(map(user => {
    if(user) return true;

    this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
    return false;
  }))
 
}
}
