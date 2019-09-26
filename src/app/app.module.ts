import { JwtInterceptor } from './interceptors/jwt.interceptors';
import { ElementService } from './services/element.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { IndexModule } from './index/index.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//HttpClient
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
    HttpClientModule,
    HomeModule,
    IndexModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  // Comme les services (AuthService, AuthGuard, ElementService) sont injectés en tant que providedIn:'root',
  // il n'est pas necessaire de les déclarer ici
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
