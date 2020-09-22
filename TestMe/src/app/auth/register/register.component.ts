import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) { }
  invalidEmail = false;
  invalidForm = false;
  ngOnInit(): void {
  }



  registerUser(form: NgForm) {
    if (form.valid) {
      this.invalidForm = false;
      if (this.validateEmail(form.controls.email.value)) {
        this.invalidEmail = false;
        const newUser = {
          _id: '',
          firstName: form.controls.firstName.value,
          lastName: form.controls.lastName.value,
          email: form.controls.email.value,
          password: form.controls.password.value,
          userType: form.controls.userType.value
        };
        this.authService.registerUser(newUser);
      } else {
        this.invalidEmail = true;
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
