import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WatchersComponent } from './watchers/watchers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import './polyfills';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './watchers/material-module';
import { WinnerComponent } from './winner/winner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColorPipePipe } from './color-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    WatchersComponent,
    WinnerComponent,
    NavbarComponent,
    ColorPipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent, WatchersComponent]
})
export class AppModule { }
