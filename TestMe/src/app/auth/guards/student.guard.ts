import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class StudentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.getUserType() === 'student' && this.authService.getUserType() !== 'teacher') {
      return true;
    } else if (this.authService.getUserType() !== 'teacher' && this.authService.getUserType() !== 'student') {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      this.router.navigateByUrl('/notAuth');
      return false;
    }
  }
}
