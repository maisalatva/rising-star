import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LongestBearishComponent } from './longest-bearish/longest-bearish.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailComponent },
  { path: 'longest-bearish', component: LongestBearishComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
