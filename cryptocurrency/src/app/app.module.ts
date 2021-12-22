import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LongestBearishComponent } from './longest-bearish/longest-bearish.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DateComponent } from './date/date.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TradingVolumeComponent } from './trading-volume/trading-volume.component';
import { TimeMachineComponent } from './time-machine/time-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    LongestBearishComponent,
    DateComponent,
    DashboardComponent,
    TradingVolumeComponent,
    TimeMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
