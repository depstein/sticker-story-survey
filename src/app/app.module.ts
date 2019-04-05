import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebStorageModule } from 'ngx-store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { SurveyPageComponent } from './survey-page/survey-page.component';
import { ConsentPageComponent } from './consent-page/consent-page.component';
import { DemographicsPageComponent } from './demographics-page/demographics-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SurveyPageComponent,
    ConsentPageComponent,
    DemographicsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    WebStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }