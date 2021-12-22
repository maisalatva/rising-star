import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LongestBearishComponent } from './longest-bearish/longest-bearish.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TradingVolumeComponent } from './trading-volume/trading-volume.component';
import { TimeMachineComponent } from './time-machine/time-machine.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'longest-bearish', component: LongestBearishComponent },
  { path: 'trading-volume', component: TradingVolumeComponent },
  { path: 'time-machine', component: TimeMachineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
