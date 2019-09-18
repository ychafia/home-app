import { LoginRoutes } from './login.router';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent],
  exports:[LoginComponent],
  imports: [
    RouterModule.forChild(LoginRoutes),
    CommonModule,
    FormsModule,
  ]
})
export class LoginModule { }
