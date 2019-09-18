import { LoginGuard } from './../guards/login.guard';
import { AuthGuard } from './../guards/auth.guard';
import { IndexComponent } from './index.component';

import { Route } from '@angular/router';


export const IndexRoutes: Route[] = [
    {
        path: '',
        component: IndexComponent,
        canActivate : [LoginGuard],
        children: [
            { 
                path: 'login', 
                loadChildren: () =>
                  import('../index/login/login.module').then(
                    m => m.LoginModule
                )
            },
            { 
                path: 'signup', 
                loadChildren: () =>
                  import('../index/signup/signup.module').then(
                    m => m.SignupModule
                )
            }
        ]
    }
];