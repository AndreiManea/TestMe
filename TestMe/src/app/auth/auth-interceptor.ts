import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken + ' ' + userId + ' ' + userEmail)
    });

    return next.handle(authRequest);
  }

}
