import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginModule } from './modules/login/login.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ButtonModule } from './core/button/button.module';
import { NavigationModule } from './core/navigation/navigation.module';
import { ActivityModule } from './modules/activity/activity.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NavigationModule,
    DialogsModule,
    LoginModule,
    ButtonModule,
    MatProgressSpinnerModule,
    DashboardModule,
    ActivityModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
