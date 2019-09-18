import { IndexRoutes } from './index/index.router';
import { Routes } from '@angular/router';
import { HomeRoutes } from './home/home.router';

export const routes: Routes = [...IndexRoutes, ...HomeRoutes];