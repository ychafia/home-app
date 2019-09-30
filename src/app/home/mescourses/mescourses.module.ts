import { MaterialModule } from './../../config/material.module';
import { FormsModule } from '@angular/forms';
import { ZonePipe } from './../../pipes/zone.pipe';
import { RouterModule } from '@angular/router';
import { MescoursesdRoutes } from './mescourses.router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MescoursesComponent } from './mescourses.component';
import { MescoursesListComponent } from './mescourses-list/mescourses-list.component';
import { MescoursesDragdropComponent } from '../mescourses-dragdrop/mescourses-dragdrop.component';

@NgModule({
  declarations: [MescoursesComponent, ZonePipe, MescoursesListComponent],
  exports: [MescoursesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MescoursesdRoutes),
    MaterialModule
  ]
})
export class MescoursesModule { }
