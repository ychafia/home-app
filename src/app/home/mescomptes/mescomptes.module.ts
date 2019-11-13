import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MescomptesComponent } from './mescomptes.component';
import { MesepargnesComponent, AddTypeEpargneDialog } from './mesepargnes/mesepargnes.component';
import { MesdepensesComponent } from './mesdepenses/mesdepenses.component';
import { MescomptesRoutes } from './mescomptes.router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/material.module';
import { FormatNumberSpacePipe } from 'src/app/pipes/format-number-space.pipe';
import { TypeEpargneComponent } from './mesepargnes/type-epargne/type-epargne.component';
import { NumericDirective } from 'src/app/directives/numeric.directive';


@NgModule({
  declarations: [MescomptesComponent, MesepargnesComponent, MesdepensesComponent, FormatNumberSpacePipe, TypeEpargneComponent, AddTypeEpargneDialog, NumericDirective],
  exports: [MescomptesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MescomptesRoutes),
    MaterialModule
  ],
  entryComponents: [AddTypeEpargneDialog]
})
export class MescomptesModule { }
