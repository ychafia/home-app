import { MescoursesdListRoutes } from './mescourses-list.router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MescoursesListComponent } from './mescourses-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MescoursesListComponent],
  exports: [MescoursesListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MescoursesdListRoutes)
  ]
})
export class MescoursesListModule { }
