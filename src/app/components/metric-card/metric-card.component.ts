import { Component, Input } from '@angular/core';
import { Metric } from '../../models/dashboard.models';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  template: `
    <div class="metric-card">
      <div class="metric-header">
        <span class="metric-label">{{ metric.label }}</span>
        <span class="metric-icon">{{ metric.icon }}</span>
      </div>
      <div class="metric-value">{{ metric.value }}</div>
      <div class="metric-delta" [class]="'delta-' + metric.trend">
        @if (metric.trend === 'up')      { <span>↑</span> }
        @if (metric.trend === 'down')    { <span>↓</span> }
        @if (metric.trend === 'neutral') { <span>→</span> }
        {{ metric.delta }}
        <span class="delta-label">vs last month</span>
      </div>
    </div>
  `,
  styles: [`
    .metric-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      transition: box-shadow 0.2s, transform 0.2s;
      cursor: default;

      &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-1px);
      }
    }

    .metric-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .metric-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    .metric-icon {
      font-size: 16px;
      opacity: 0.6;
    }

    .metric-value {
      font-size: 26px;
      font-weight: 700;
      color: var(--color-text-primary);
      line-height: 1;
      margin-bottom: 8px;
      font-variant-numeric: tabular-nums;
    }

    .metric-delta {
      font-size: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 3px;

      &.delta-up      { color: var(--color-green); }
      &.delta-down    { color: var(--color-red); }
      &.delta-neutral { color: var(--color-text-muted); }
    }

    .delta-label {
      font-weight: 400;
      color: var(--color-text-muted);
      margin-left: 2px;
    }
  `],
})
export class MetricCardComponent {
  @Input({ required: true }) metric!: Metric;
}
