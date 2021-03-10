import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import {loginService} from './login.service';
// import { AlertService } from '../_alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  err = null;
  messageForLogIn = '';

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public loginService: loginService
  ) {
    this.signinForm = this.fb.group({
      email: [],
      password: []
    })
  }
  ngOnInit() {
    localStorage.clear();
  }
  onSubmit() {
    this.loginService.logIn(this.signinForm.value.email, this.signinForm.value.password).subscribe(
      res => {
        this.messageForLogIn = '';
        const accessToken = (res as { [key: string]: any })["access_token"] as string;
        localStorage.setItem('token', accessToken);
        const status_code = (res as { [key: string]: any })["status_code"] as string;

        localStorage.setItem(
          'userID',
          (res as { [key: string]: any })["userId"] as string
        )
        localStorage.setItem(
          'userName',
          (res as { [key: string]: any })["userName"] as string
        )
        if(status_code && status_code != '200') {
          this.messageForLogIn = 'Email or password is incorect. Please try again!'
          return;
        }
        this.router.navigate(['/dashboard']);
        
      },
      error => {
        this.messageForLogIn = 'This Account is banned or does not exist!';
      }
    )
  }

  openSignUp() {
    this.router.navigate(['/user-sign-up'])
  }

}