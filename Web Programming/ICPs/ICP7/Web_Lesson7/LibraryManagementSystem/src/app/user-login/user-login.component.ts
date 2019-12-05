import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../api.service";
import { first } from 'rxjs/operators';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  username: String;
  password: String;

  constructor(
    private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }


  onLoginSubmit(form: NgForm) {
console.log('logincheck');
    this.api.checkLogin(form)
      .subscribe(res => {
        console.log(res,form);

        if(res.length>0 && res[0]['password'] == form['password']) {
          let password = res[0]['password'];
          let id=form['username'];
          this.router.navigate(['/homePage',id]);
        }
        else{
          alert('Invalid username and password');
        }
      }, (err) => {
        console.log(err);
      });
  }

}
