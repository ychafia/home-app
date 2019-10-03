import { MescoursesListModule } from './mescourses-list/mescourses-list.module';
import { MaterialModule } from './../../config/material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MescoursesdRoutes } from './mescourses.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MescoursesComponent } from './mescourses.component';
import { MescoursesDragdropComponent } from '../mescourses-dragdrop/mescourses-dragdrop.component';

@NgModule({
  declarations: [MescoursesComponent],
  exports: [MescoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MescoursesdRoutes),
    MaterialModule,
    MescoursesListModule
  ]
})
export class MescoursesModule { }
