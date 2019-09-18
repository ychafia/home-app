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
            }
        ]
    }
];