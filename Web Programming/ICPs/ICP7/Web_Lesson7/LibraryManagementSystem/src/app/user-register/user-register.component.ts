import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../api.service";
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup;
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name': [null, Validators.required],
      'username': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onRegisterSubmit(form: NgForm) {
    console.log(form);
    // Required Fields
    if(form.name==null || form.name=="") {
      alert("Enter Name");
      return false;
    }
    this.api.createUser(form)
      .subscribe(res => {

          this.router.navigate(['/userlogin']);

      }, (err) => {
        console.log(err);
      });

  }

}
