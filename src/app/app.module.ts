import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { IndexModule } from './index/index.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    IndexModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
