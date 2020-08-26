import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from "../api.service";
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  isJoint:boolean;
  username:string;
  JointAccountNumber:String;
  Account = {};
  Account1 = {};
  Transactions=[];
  constructor(private router: ActivatedRoute,private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.username=localStorage.getItem("username");
    console.log(this.router.snapshot.params['id'][0]);
    if(this.router.snapshot.params['id'][0]=='J'){
      this.JointAccountNumber=this.router.snapshot.params['id'];
      this.getJointAccountDetails(this.router.snapshot.params['id']);
      this.isJoint=true;
    }
    else {
      this.getAccountDetails(this.router.snapshot.params['id']);
      this.isJoint=false;
    }

  }
  getAccountDetails(id) {
    this.api.getAccount(id)
      .subscribe(data => {
        console.log(data);
        this.Account = data[0];
      });

    this.api.getTransactions(id)
      .subscribe(data => {
        console.log(data);
        this.Transactions = data;
      });
  }
  getJointAccountDetails(id) {
    this.api.getJointAccount(id)
      .subscribe(data => {
        console.log(data);
        this.api.getAccount(data[0].AccountNumber1)
          .subscribe(dataAccountNumber1 => {
            console.log(dataAccountNumber1);
            this.Account = dataAccountNumber1[0];
          });
        this.api.getAccount(data[0].AccountNumber2)
          .subscribe(dataAccountNumber2 => {
            console.log(dataAccountNumber2);
            this.Account1 = dataAccountNumber2[0];
          });
      });

    this.api.getTransactions(id)
      .subscribe(data => {
        console.log(data);
        this.Transactions = data;
      });
  }
  doTransaction(accntnumber){
    let data={
      AccountNumber: accntnumber,
      };

    this.api.postTransaction(data)
      .subscribe(res => {
        console.log(res);
        this.Transactions.push(res);
        //this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
