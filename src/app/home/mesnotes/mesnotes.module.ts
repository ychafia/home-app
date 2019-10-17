import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesnotesComponent } from './mesnotes.component';
import { MesnotesRoutes } from './mesnotes.router';
import { DetailsNotesComponent } from './details-notes/details-notes.component';



@NgModule({
  declarations: [MesnotesComponent, DetailsNotesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MesnotesRoutes),
  ]
})
export class MesnotesModule { }
