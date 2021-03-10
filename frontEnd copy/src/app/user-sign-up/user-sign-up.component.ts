import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import {loginService} from '../login/login.service';


@Component({
  selector: 'app-user-sign-up',
  templateUrl:'./user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  
  signUpForm: FormGroup;
  err = null;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public loginService: loginService
  ) {
    this.signUpForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit() { 
    localStorage.clear();
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.loginService.signUp(this.signUpForm.value).subscribe(
      res => {
        if(res.success)
          this.router.navigate(['/login'])
      }
    )
  }
}
