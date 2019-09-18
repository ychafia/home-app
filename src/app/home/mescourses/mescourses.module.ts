import { RouterModule } from '@angular/router';
import { MescoursesdRoutes } from './mescourses.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MescoursesComponent } from './mescourses.component';

@NgModule({
  declarations: [MescoursesComponent],
  exports: [MescoursesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MescoursesdRoutes),
  ]
})
export class MescoursesModule { }
