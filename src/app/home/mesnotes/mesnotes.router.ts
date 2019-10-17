import { DetailsNotesComponent } from './details-notes/details-notes.component';
import { MesnotesComponent } from './mesnotes.component';
import { Route } from '@angular/router';
export const MesnotesRoutes: Route[] = [
  {
    path: '',
    component: MesnotesComponent
  },
  {
    path: 'details-note',
    component: DetailsNotesComponent
  }
  ,
  {
    path: 'details-note/:id',
    component: DetailsNotesComponent
  }
];