
import { Route } from '@angular/router';
import { MesepargnesComponent } from './mesepargnes.component';
import { GraphicsEpargnesComponent } from './graphics-epargnes/graphics-epargnes.component';
import { GlobalGraphicComponent } from './global-graphic/global-graphic.component';
export const MesepargnesRoutes: Route[] = [
  {
    path: '',
    component: MesepargnesComponent
  },
  {
    path: 'graphics-epargne',
    component: GraphicsEpargnesComponent
  },
  {
    path: 'graphic-general',
    component: GlobalGraphicComponent
  }
];