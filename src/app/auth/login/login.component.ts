import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { }

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }