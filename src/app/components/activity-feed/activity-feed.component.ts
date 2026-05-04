import { Component, Input } from '@angular/core';
import { Activity } from '../../models/dashboard.models';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  template: `
    <div class="activity-card">
      <div class="activity-header">
        <h3 class="activity-title">Recent Activity</h3>
        <button class="view-all">View all →</button>
      </div>

      <ul class="activity-list">
        @for (item of activity; track item.id) {
          <li class="activity-item">
            <div class="activity-icon" [class]="'icon-' + item.type">
              {{ activityIcon(item.type) }}
            </div>
            <div class="activity-body">
              <p class="activity-message">{{ item.message }}</p>
              <div class="activity-meta">
                <span class="activity-user">{{ item.user }}</span>
                <span class="activity-dot">·</span>
                <span class="activity-time">{{ item.timestamp }}</span>
              </div>
            </div>
          </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .activity-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .activity-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      border-bottom: 1px solid var(--color-border);
    }

    .activity-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .view-all {
      font-size: 12px;
      color: var(--color-indigo);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      font-weight: 500;

      &:hover { opacity: 0.7; }
    }

    .activity-list {
      list-style: none;
      padding: 8px 0;
    }

    .activity-item {
      display: flex;
      gap: 12px;
      padding: 10px 20px;
      transition: background 0.15s;

      &:hover {
        background: rgba(0,0,0,0.02);
      }
    }

    .activity-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;

      &.icon-deploy { background: rgba(34,197,94,.1); }
      &.icon-user   { background: rgba(99,102,241,.1); }
      &.icon-alert  { background: rgba(239,68,68,.1); }
      &.icon-commit { background: rgba(245,158,11,.1); }
      &.icon-report { background: rgba(100,116,139,.1); }
    }

    .activity-body {
      flex: 1;
      min-width: 0;
    }

    .activity-message {
      font-size: 13px;
      color: var(--color-text-primary);
      line-height: 1.4;
      margin-bottom: 3px;
    }

    .activity-meta {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .activity-user {
      font-weight: 500;
      color: var(--color-text-secondary);
    }

    .activity-dot {
      opacity: 0.5;
    }
  `],
})
export class ActivityFeedComponent {
  @Input({ required: true }) activity: Activity[] = [];

  activityIcon(type: Activity['type']): string {
    const icons: Record<string, string> = {
      deploy: '🚀',
      user: '👤',
      alert: '⚠️',
      commit: '📝',
      report: '📊',
    };
    return icons[type] ?? '●';
  }
}
