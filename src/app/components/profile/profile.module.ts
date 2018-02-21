import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';

const routes: Routes = [
    {
        path: '',
        component:ProfileComponent
    }
];

@NgModule({
  imports: [
   
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    
  ],
  declarations: [ProfileComponent],
  providers:[AuthService]
})
export class ProfileModule { }
