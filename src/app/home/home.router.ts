import { MesnotesModule } from './mesnotes/mesnotes.module';
import { MescoursesModule } from './mescourses/mescourses.module';
import { AuthGuard } from './../guards/auth.guard';
import { HomeComponent } from './home.component';
import { Route } from '@angular/router';
export const HomeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        canActivate : [AuthGuard],
        children: [
            {
                path: 'mescourses',
                loadChildren: () =>
                  import('../home/mescourses/mescourses.module').then(
                    m => m.MescoursesModule
                )
            },
            {
                path: 'mescoursesv2',
                loadChildren: () =>
                  import('../home/mescourses-dragdrop/mescourses-dragdrop.module').then(
                    m => m.MescoursesDragdropModule
                )
            },
            {
                path: 'mesnotes',
                loadChildren: () =>
                  import('../home/mesnotes/mesnotes.module').then(
                    m => m.MesnotesModule
                )
            },
            {
                path: 'mescomptes',
                loadChildren: () =>
                  import('../home/mescomptes/mescomptes.module').then(
                    m => m.MescomptesModule
                )
            }
        ]
    }
];