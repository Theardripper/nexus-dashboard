import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MetricCardComponent } from './components/metric-card/metric-card.component';
import { ChartWidgetComponent } from './components/chart-widget/chart-widget.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ActivityFeedComponent } from './components/activity-feed/activity-feed.component';
import { DashboardService } from './services/dashboard.service';
import { Metric, ChartDataPoint, User, Activity } from './models/dashboard.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SidebarComponent, TopbarComponent,
    MetricCardComponent, ChartWidgetComponent,
    UsersTableComponent, ActivityFeedComponent,
  ],
  template: `
    <div class="app-shell">
      <app-sidebar />
      <div class="main-area">
        <app-topbar />
        <main class="content-area">
          <div class="metrics-grid">
            @for (metric of metrics; track metric.label) {
              <app-metric-card [metric]="metric" />
            }
          </div>
          <div class="two-col" style="margin-top: 20px;">
            <app-chart-widget [data]="chartData" />
            <app-activity-feed [activity]="activity" />
          </div>
          <div style="margin-top: 20px;">
            <app-users-table [users]="users" />
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: var(--color-bg);
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 14px;
    }
  `],
})
export class AppComponent implements OnInit {
  private svc = inject(DashboardService);
  metrics: Metric[] = [];
  chartData: ChartDataPoint[] = [];
  users: User[] = [];
  activity: Activity[] = [];

  ngOnInit() {
    this.svc.metrics$.subscribe(m => this.metrics = m);
    this.svc.chartData$.subscribe(c => this.chartData = c);
    this.svc.users$.subscribe(u => this.users = u);
    this.svc.activity$.subscribe(a => this.activity = a);
  }
}
