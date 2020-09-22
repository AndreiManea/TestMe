import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) { }
  invalidForm = false;
  invalidEmail = false;
  ngOnInit(): void {
  }
  loginUser(form: NgForm) {
    if (form.valid) {
      this.invalidForm = false;
      if (!this.validateEmail(form.controls.email.value)) {
        this.invalidEmail = true;
      } else {
        this.invalidEmail = false;
        const userData = {email: form.controls.email.value, password: form.controls.password.value};
        this.authService.loginUser(userData);
      }
    } else {
      this.invalidForm = true;
    }
  }
  validateEmail(email: string) {
    const testEmail = email.slice(email.length - 9, email.length);
    const uvtEmail = '@e-uvt.ro';
    return testEmail === uvtEmail;
 }

}
