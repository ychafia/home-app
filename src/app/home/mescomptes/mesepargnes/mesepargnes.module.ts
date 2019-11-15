import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/material.module';
import { MesepargnesRoutes } from './mesepargnes.router';
import { MesepargnesComponent } from './mesepargnes.component';



@NgModule({
  declarations: [MesepargnesComponent],
  exports: [MesepargnesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MesepargnesRoutes),
    MaterialModule
  ]
})
export class MesepargnesModule { }
