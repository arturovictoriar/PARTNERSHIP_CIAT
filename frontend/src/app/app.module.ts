import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetPartnerCiatComponent } from './set-partner-ciat/set-partner-ciat.component';
import { GetPartnerCiatComponent } from './get-partner-ciat/get-partner-ciat.component';

@NgModule({
  declarations: [
    AppComponent,
    SetPartnerCiatComponent,
    GetPartnerCiatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
