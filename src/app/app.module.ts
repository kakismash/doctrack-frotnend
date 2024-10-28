import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideLottieOptions } from 'ngx-lottie';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this for animations

import player from 'lottie-web';
import { AuthGuard } from './guard/auth.guard';
import { ROLES, ROLES_TOKEN } from './config/roles.config';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AdminGuard } from './guard/admin.guard';
import { Super_adminGuard } from './guard/super_admin.guard';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ROLES_TOKEN, useValue: ROLES },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    provideLottieOptions({
      player: () => player,
    }),
    AuthGuard,
    AdminGuard,
    Super_adminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
