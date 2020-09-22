import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-not-auth',
  templateUrl: './not-auth.component.html',
  styleUrls: ['./not-auth.component.scss']
})
export class NotAuthComponent implements OnInit {
  authStatus = {authStatus: false, userType: '', userId: ''};
  authStatusListener: Subscription;
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const token = this.authService.getToken();
    const userType = this.authService.getUserType();
    const userId = this.authService.getUserId();
    const userEmail = this.authService.getUserEmail();
    const userName = this.authService.getUserName();

    if (token) {
      this.authService.setAuthStatus(true, userType, userId, userEmail, userName);
    }
    this.authStatusListener = this.authService.getAuthStatusListener().subscribe((authStatus) => {
      this.authStatus = {authStatus: authStatus.authStatus, userType: authStatus.userType, userId: authStatus._id};
    });

    this.authStatus.userType = this.authService.getUserType();
    if (this.authStatus.userType === 'student') {
      this.authStatus.userType = 'teacher';
    } else {
      this.authStatus.userType = 'student';
    }
  }
}
