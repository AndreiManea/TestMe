import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatus = {authStatus: false, userType: '', userId: '', userEmail: '', userName: ''};
  userName = '';
  userNameListener: Subscription;
  authStatusListener: Subscription;
  sideNav = false;

  constructor(public authService: AuthService) {
  }

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
      this.authStatus = {
        authStatus: authStatus.authStatus,
        userType: authStatus.userType,
        userId: authStatus._id,
        userEmail: authStatus.userEmail,
        userName: authStatus.userName};
    });

  }

  logoutUser() {
    this.authService.logoutUser();
  }

  toggleSideNav() {
    this.sideNav = !this.sideNav;
  }


  ngOnDestroy(): void {
    this.userNameListener.unsubscribe();
    this.authStatusListener.unsubscribe();
  }

}
