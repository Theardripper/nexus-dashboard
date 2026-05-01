import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <header class="topbar">
      <div class="topbar-left">
        <h1 class="page-title">Overview</h1>
        <span class="breadcrumb">Dashboard → Overview</span>
      </div>

      <div class="topbar-right">
        <!-- Live requests ticker -->
        <div class="live-ticker">
          <span class="pulse"></span>
          <span class="ticker-value">{{ svc.requestsPerSecond$ | async }} req/s</span>
        </div>

        <!-- Notification bell -->
        <button class="icon-btn" aria-label="Notifications">
          <span>🔔</span>
          <span class="notif-dot"></span>
        </button>

        <!-- User avatar -->
        <div class="avatar" aria-label="User menu">JD</div>
      </div>
    </header>
  `,
  styles: [`
    .topbar {
      height: var(--topbar-height, 60px);
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    /* ── Left ── */
    .topbar-left {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .page-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      line-height: 1.2;
    }

    .breadcrumb {
      font-size: 11px;
      color: var(--color-text-muted);
    }

    /* ── Right ── */
    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .live-ticker {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(34, 197, 94, 0.08);
      border: 1px solid rgba(34, 197, 94, 0.2);
      border-radius: 20px;
      padding: 5px 12px;
      font-size: 12px;
      font-weight: 500;
      color: var(--color-green);
    }

    .pulse {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-green);
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(0.8); }
    }

    .ticker-value {
      font-variant-numeric: tabular-nums;
      min-width: 80px;
    }

    .icon-btn {
      position: relative;
      width: 36px;
      height: 36px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-surface);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 15px;
      transition: background 0.15s;

      &:hover {
        background: var(--color-bg);
      }
    }

    .notif-dot {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-indigo);
      border: 1.5px solid white;
    }

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: var(--color-indigo);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: opacity 0.15s;

      &:hover { opacity: 0.85; }
    }
  `],
})
export class TopbarComponent {
  svc = inject(DashboardService);
}
