import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { User } from '../shared/models/user.model';
import { LoginRequestPayload } from '../login/login-request.payload';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login/login-response.payload';
import { decode } from 'querystring';
import { applicantService } from './applicant.service';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;

  currentUser: User = new User();

  constructor(private userService: UserService,
              private router: Router,
              // eslint-disable-next-line @typescript-eslint/no-shadow
              private applicantService: applicantService,
              private jwtHelper: JwtHelperService,
              public toast: ToastComponent,
              private httpClient: HttpClient,) {

    const token = localStorage.getItem('token');

    if (token !== null) {
      console.log(token);
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
      this.applicantService.getProcess();
      this.userService.getUsers();
    } else{
      console.log('not token');
    }
  }

  login(loginRequestPayload: LoginRequestPayload): void {
    this.userService.login(loginRequestPayload).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.access_token);
        const decodedUser = this.decodeUserFromToken(res.access_token);
        console.log(decodedUser);
        this.setCurrentUser(decodedUser);
        this.loggedIn = true;
        this.router.navigate(['/admin']);
      },
      error => this.toast.setMessage('Invalid email or password!', 'danger')
    );
  }

  logout(): void {

    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token: string): object {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser: any): void {
    this.loggedIn = true;
    //this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.sub;
    this.currentUser.role = decodedUser.roles[0];
    if(this.currentUser.role === 'ROLE_ADMIN'){
      this.isAdmin = true;
      console.log('true is true');
    }
    //this.isAdmin = decodedUser.role === 'admin';
    console.log(decodedUser.role === 'admin', this.currentUser.role);
    delete decodedUser.role;
  }

}
