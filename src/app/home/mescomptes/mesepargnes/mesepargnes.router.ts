
import { Route } from '@angular/router';
import { MesepargnesComponent } from './mesepargnes.component';
import { GraphicsEpargnesComponent } from './graphics-epargnes/graphics-epargnes.component';
export const MesepargnesRoutes: Route[] = [
  {
    path: '',
    component: MesepargnesComponent
  },
  {
    path: 'graphics-epargne',
    component: GraphicsEpargnesComponent
  }
];