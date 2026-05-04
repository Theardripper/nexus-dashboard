import { Routes } from '@angular/router';
import { OverviewPageComponent } from './pages/overview/overview-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewPageComponent },
  { path: 'analytics', component: OverviewPageComponent }, // reuse for demo
  { path: 'users', component: OverviewPageComponent },
  { path: '**', redirectTo: 'overview' },
];
