import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, } from '@angular/material';
import { EnterDataModule } from './enter-data/enter-data.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ButtonModule } from './button/button.module';
import { NavigationModule } from './navigation/navigation.module';
import { ActivityModule } from './activity/activity.module';

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
    LoginModule,
    ButtonModule,
    EnterDataModule,
    MatProgressSpinnerModule,
    DashboardModule,
    ActivityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
