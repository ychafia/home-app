import { ZonePipe } from './../../pipes/zone.pipe';
import { MaterialModule } from './../../config/material.module';
import { MescoursesdRoutesDragdrop } from './mescourses-dragdrop.router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MescoursesDragdropComponent } from './mescourses-dragdrop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MescoursesDragdropComponent, ZonePipe],
  exports: [MescoursesDragdropComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MescoursesdRoutesDragdrop),
    MaterialModule
  ]
})
export class MescoursesDragdropModule { }
