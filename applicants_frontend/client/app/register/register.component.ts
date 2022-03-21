import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { RegisterRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  @Output() newItemEvent = new EventEmitter<any>();
  registerRequestPayload: RegisterRequestPayload;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  userId = new FormControl('');
  email = new FormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = new FormControl('', [
    Validators.required
  ]);


  registerForm = this.formBuilder.group({
    username: this.username,
    userId: this.userId,
    email: this.email,
    password: this.password,
    role: this.role
  });


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent,
              private userService: UserService,
              ) {
                this.registerRequestPayload = {
                  username: '',
                  password: '',
                };
               }

  //ngOnInit(): void {}


  setClassUsername(): object {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }

  setClassEmail(): object {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }

  setClassPassword(): object {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

  register(): void {
    this.registerRequestPayload.username = this.registerForm.get('username')?.value;
    this.registerRequestPayload.password = this.registerForm.get('password')?.value;
    this.newItemEvent.emit(this.registerRequestPayload);

    this.userService.register(this.registerRequestPayload).subscribe(
      res => {
        this.toast.setMessage('You successfully registered!', 'success');
        //this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('Email already exists', 'danger')
    );
  }
}
