import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/material.module';
import { SynthesesRoutes } from './syntheses-comptes.router';
import { SynthsesComptesComponent, EditSynthesesDialog, AddSynthesesDialog } from './synthses-comptes.component';
import { YearPipe } from 'src/app/pipes/year.pipe';



@NgModule({
  declarations: [SynthsesComptesComponent, EditSynthesesDialog, AddSynthesesDialog, YearPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SynthesesRoutes),
    MaterialModule
  ],
  entryComponents: [EditSynthesesDialog, AddSynthesesDialog]
})
export class SynthsesComptesModule { }
