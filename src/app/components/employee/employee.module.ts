import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
const routes: Routes = [
    {
        path: '',
        component: EmployeeComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  declarations: [EmployeeComponent]
})
export class EmployeeModule { }
