import {Injectable} from '@angular/core';
import {User} from './user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  authStatus = {authStatus: false, userType: '', _id: '', userEmail: '', userName: ''};
  authStatusListener = new Subject<{ authStatus: boolean, userType: string, _id: string, userEmail: string, userName: string }>();

  constructor(public http: HttpClient, public router: Router) {
  }

  registerUser(user: User) {
    this.http.post<{ message: string }>('http://localhost:3000/api/auth/register', user).subscribe((response) => {
      console.log(response.message);
      this.router.navigateByUrl('/login');
    }, error => {

    });
  }

  loginUser(userData: { email: string, password: string }) {
    // tslint:disable-next-line:max-line-length
    this.http.post <{ token: any, userType: string, _id: string, userEmail: string, userName: string }>('http://localhost:3000/api/auth/login', userData)
      .subscribe(response => {
        this.token = response.token;
        this.authStatus = {
          authStatus: true,
          userType: response.userType,
          _id: response._id,
          userEmail: response.userEmail,
          userName: response.userName
        };
        localStorage.setItem('token', this.token);
        localStorage.setItem('userType', this.authStatus.userType);
        localStorage.setItem('userId', this.authStatus._id);
        localStorage.setItem('userEmail', this.authStatus.userEmail);
        localStorage.setItem('userName', this.authStatus.userName);
        console.log(this.authStatus);
        this.authStatusListener.next({
          authStatus: true,
          userType: response.userType,
          _id: response._id,
          userEmail: response.userEmail,
          userName: response.userName
        });
        if (this.authStatus.userType === 'teacher') {
          this.router.navigateByUrl('/list');
        } else {
          this.router.navigateByUrl('/takeQuiz');
        }
      });
  }

  logoutUser() {
    this.authStatus = {authStatus: false, userType: '', _id: '', userEmail: '', userName: ''};
    this.authStatusListener.next({authStatus: false, userType: '', _id: '', userEmail: '', userName: ''});
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }


  getAuthStatus() {
    return this.authStatus;
  }


  // tslint:disable-next-line:variable-name
  setAuthStatus(authStatus: boolean, userType: string, _id: string, userEmail: string, userName: string) {
    this.authStatus = {authStatus, userType, _id, userEmail, userName};
    this.authStatusListener.next({authStatus, userType, _id, userEmail, userName});
  }

  getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  getUserType() {
    this.authStatus.userType = localStorage.getItem('userType');
    return this.authStatus.userType;
  }

  getUserId() {
    this.authStatus._id = localStorage.getItem('userId');
    return this.authStatus._id;
  }

  getUserEmail() {
    this.authStatus.userEmail = localStorage.getItem('userEmail');
    return this.authStatus.userEmail;
  }

  getUserName() {
    this.authStatus.userName = localStorage.getItem('userName');
    return this.authStatus.userName;
  }


}
