import { JwtInterceptor } from './interceptors/jwt.interceptors';
import { ElementService } from './services/element.service';
import { AuthGuard } from './guards/auth.guard';
//import { AuthService } from './services/auth.service';
import { HomeModule } from './home/home.module';
import { RouterModule } from '@angular/router';
import { IndexModule } from './index/index.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
//HttpClient
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routes } from './app.router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NumericDirective } from './directives/numeric.directive';
import { ChartsModule } from 'ng2-charts';
import { appLoadFactory, AppLoadService } from './services/app-load.service';

@NgModule({
  declarations: [
    AppComponent
    //NumericDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AppRoutingModule, //l'ordre est important, il faudra l'utiliser à la fin des imports
    HttpClientModule,
    HomeModule,
    IndexModule,
    RouterModule.forRoot(routes, { useHash: false }), //preloadingStrategy: PreloadAllModules
    ChartsModule
  ],
  // Comme les services (AuthService, AuthGuard, ElementService) sont injectés en tant que providedIn:'root',
  // il n'est pas necessaire de les déclarer ici depuis Angular 6
  providers: [
    { provide: APP_INITIALIZER, useFactory: appLoadFactory, deps: [AppLoadService, HttpClient], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
