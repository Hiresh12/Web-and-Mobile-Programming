import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {ApiService} from "../api.service";
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  showCreate:boolean
  username: string;
  password: String;
  Accounts=[];
  JointAccount=[];
  accountnumber:String;

  constructor(private route: ActivatedRoute,private router: Router,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.username=this.route.snapshot.params['id'];
    this.getAccounts(this.route.snapshot.params['id']);

  }
  getAccounts(id) {
    this.api.getAccountByUser(id)
      .subscribe(data => {
        console.log(data);
        if(data.length>0){
          this.showCreate=false;
          this.getJointAccounts(data[0].AccountNumber);
        }
        else{
          this.showCreate=true;
        }
        this.Accounts = data;
      });
  }
  getJointAccounts(id) {
    this.api.getJointAccountByUser(id)
      .subscribe(data => {
        console.log(data);
        this.JointAccount = data;
      });
  }
  CreateAccount(){
    let data={username:this.route.snapshot.params['id'],
      AccountNumber: "",
      Balance: "10000",
      Type: "Savings"};

    this.api.postAccount(data)
      .subscribe(res => {
      console.log(res);
      this.Accounts.push(res);
      this.showCreate=false;
    }, (err) => {
      console.log(err);
    });
  }
  CreateJointAccount(){
    let data={
      AccountNumber1: this.Accounts[0].AccountNumber,
      AccountNumber2: this.accountnumber,
      };

    this.api.postJointAccount(data)
      .subscribe(res => {
        console.log(res);
        this.JointAccount.push(res);

      }, (err) => {
        console.log(err);
      });
  }
  ViewAccount(acctnumber){
    localStorage.setItem("username",this.username);
    let id = acctnumber;
    this.router.navigate(['/account-details',id]);
  }
}
