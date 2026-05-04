import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { MetricCardComponent } from '../../components/metric-card/metric-card.component';
import { ChartWidgetComponent } from '../../components/chart-widget/chart-widget.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { ActivityFeedComponent } from '../../components/activity-feed/activity-feed.component';
import { Metric, User, ChartDataPoint, Activity } from '../../models/dashboard.models';

@Component({
  selector: 'app-overview-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    MetricCardComponent,
    ChartWidgetComponent,
    UsersTableComponent,
    ActivityFeedComponent,
  ],
  template: `
    <div class="overview">
      <!-- Page intro -->
      <div class="page-intro">
        <div>
          <h2 class="intro-title">Good morning, João 👋</h2>
          <p class="intro-subtitle">Here's what's happening with your platform today.</p>
        </div>
        <div class="date-badge">
          {{ today | date: 'EEEE, MMMM d' }}
        </div>
      </div>

      <!-- Metrics grid -->
      <div class="metrics-grid">
        @for (metric of metrics; track metric.label) {
          <app-metric-card [metric]="metric" />
        }
      </div>

      <!-- Chart + Activity row -->
      <div class="two-col">
        <app-chart-widget
          [data]="chartData"
          title="API Requests"
          subtitle="Thousands of requests per day — last 7 days"
        />
        <app-activity-feed [activity]="activity" />
      </div>

      <!-- Users table -->
      <app-users-table [users]="users" />
    </div>
  `,
  styles: [`
    .overview {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 1200px;
    }

    /* ── Intro ── */
    .page-intro {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .intro-title {
      font-size: 20px;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .intro-subtitle {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin-top: 3px;
    }

    .date-badge {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-text-secondary);
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      padding: 7px 14px;
      border-radius: 8px;
    }

    /* ── Metrics ── */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Two-column ── */
    .two-col {
      display: grid;
      grid-template-columns: 3fr 2fr;
      gap: 14px;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class OverviewPageComponent implements OnInit {
  private svc = inject(DashboardService);

  metrics: Metric[] = [];
  users: User[] = [];
  chartData: ChartDataPoint[] = [];
  activity: Activity[] = [];
  today = new Date();

  ngOnInit(): void {
    this.svc.metrics$.subscribe((m) => (this.metrics = m));
    this.svc.users$.subscribe((u) => (this.users = u));
    this.svc.chartData$.subscribe((c) => (this.chartData = c));
    this.svc.activity$.subscribe((a) => (this.activity = a));
  }
}
