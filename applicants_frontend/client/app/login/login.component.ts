import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);

  loginForm = this.formBuilder.group({
    username: this.username,
    password: this.password
  });

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              ) {
                this.loginRequestPayload = {
                  username: '',
                  password: ''
                };
              }

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.navigate(['/admin']);
    }
  }

  setClassEmail(): object {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassPassword(): object {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  login(): void {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    console.log(this.loginRequestPayload);
    this.auth.login(this.loginRequestPayload);
  }
}
