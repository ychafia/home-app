import { MescomptesComponent } from './mescomptes.component';
import { Route } from '@angular/router';
import { MesepargnesComponent } from './mesepargnes/mesepargnes.component';
import { MesdepensesComponent } from './mesdepenses/mesdepenses.component';
export const MescomptesRoutes: Route[] = [
  {
    path: '',
    component: MescomptesComponent
  },
  {
    path: 'mesepargnes',
    component: MesepargnesComponent
  },
  {
    path: 'mesdepenses',
    component: MesdepensesComponent
  }
];