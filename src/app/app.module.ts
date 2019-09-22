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
import { ZonePipe } from './pipes/zone.pipe';

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
  providers: [
    AuthService,
    AuthGuard, 
    ElementService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
