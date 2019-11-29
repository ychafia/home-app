import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/config/material.module';
import { MesepargnesRoutes } from './mesepargnes.router';
import { MesepargnesComponent, AddTypeEpargneDialog } from './mesepargnes.component';
import { GraphicsEpargnesComponent } from './graphics-epargnes/graphics-epargnes.component';
import { NumericDirective } from 'src/app/directives/numeric.directive';
import { FormatNumberSpacePipe } from 'src/app/pipes/format-number-space.pipe';
import { TypeEpargneComponent } from './type-epargne/type-epargne.component';
import { ChartsModule } from 'ng2-charts';
import { GlobalGraphicComponent } from './global-graphic/global-graphic.component';


@NgModule({
  declarations: [MesepargnesComponent, GraphicsEpargnesComponent, NumericDirective, FormatNumberSpacePipe, TypeEpargneComponent, AddTypeEpargneDialog, GlobalGraphicComponent],
  exports: [MesepargnesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MesepargnesRoutes),
    MaterialModule,
    ChartsModule
  ],
  entryComponents: [AddTypeEpargneDialog]
})
export class MesepargnesModule { }
