import { MescomptesComponent } from './mescomptes.component';
import { Route } from '@angular/router';
import { MesepargnesComponent } from './mesepargnes/mesepargnes.component';
import { MesdepensesComponent } from './mesdepenses/mesdepenses.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
export const MescomptesRoutes: Route[] = [
  // {
  //   path: '',
  //   component: MescomptesComponent
  // },
  // {
  //   path: 'mesepargnes',
  //   component: MesepargnesComponent
  // },
  // {
  //   path: 'mesdepenses',
  //   component: MesdepensesComponent
  // }
  {
    path: '',
    component: MescomptesComponent,
    canActivate : [AuthGuard],
    children: [
        {
            path: 'mesepargnes',
            loadChildren: () =>
              import('./mesepargnes/mesepargnes.module').then(
                m => m.MesepargnesModule
            )
        },
        {
            path: 'syntheses',
            loadChildren: () =>
              import('./synthses-comptes/synthses-comptes.module').then(
                m => m.SynthsesComptesModule
            )
        },
        {
            path: 'mesdepenses',
            component: MesdepensesComponent
        }
    ]
  }
];