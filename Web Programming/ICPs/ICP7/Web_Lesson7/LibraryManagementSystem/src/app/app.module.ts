import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const appRoutes: Routes = [
  {
    path: 'userRegister',
    component: UserRegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'userlogin',
    component: UserLoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'homePage/:id',
    component: HomePageComponent,
    data: { title: 'Welcome' }
  },
  {
    path: 'account-details/:id',
    component: AccountDetailsComponent,
    data: { title: 'Account Details' }
  },
  { path: '',
    redirectTo: '/userlogin',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    HomePageComponent,
    AccountDetailsComponent,
    UserRegisterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
