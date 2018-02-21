import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './../../services/auth.service';
import { HttpModule } from '@angular/http';
import {DatePipe} from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';


const routes: Routes = [
    {
        path: '',
        component: SignUpComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    
  ],
  declarations: [SignUpComponent],
  providers:[AuthService,DatePipe]
})
export class SignUpModule { }
