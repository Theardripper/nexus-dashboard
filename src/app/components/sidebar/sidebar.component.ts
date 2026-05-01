import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { NavItem } from '../../models/dashboard.models';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <!-- Logo -->
      <div class="logo">
        <div class="logo-mark">◆</div>
        <div class="logo-text">
          <span class="logo-name">NEXUS</span>
          <span class="logo-tagline">admin panel</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="nav">
        <div class="nav-section-label">Main menu</div>
        @for (item of navItems; track item.route) {
          <a
            class="nav-item"
            [routerLink]="item.route"
            routerLinkActive="active"
            (click)="svc.setActiveRoute(item.route)"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
            @if (item.badge) {
              <span class="nav-badge">{{ item.badge }}</span>
            }
          </a>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <div class="user-pill">
          <div class="user-avatar">JD</div>
          <div class="user-info">
            <span class="user-name">João Dev</span>
            <span class="user-role">Super Admin</span>
          </div>
          <span class="online-dot"></span>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width, 220px);
      background: var(--sidebar-bg);
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--sidebar-border);
      flex-shrink: 0;
      height: 100vh;
    }

    /* ── Logo ── */
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 22px 18px 18px;
      border-bottom: 1px solid var(--sidebar-border);
    }

    .logo-mark {
      font-size: 20px;
      color: var(--sidebar-accent);
      line-height: 1;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
    }

    .logo-name {
      font-size: 13px;
      font-weight: 700;
      color: #e2e8f0;
      letter-spacing: 0.1em;
    }

    .logo-tagline {
      font-size: 10px;
      color: var(--sidebar-text);
      letter-spacing: 0.05em;
    }

    /* ── Nav ── */
    .nav {
      flex: 1;
      padding: 16px 10px;
      overflow-y: auto;
    }

    .nav-section-label {
      font-size: 10px;
      font-weight: 600;
      color: var(--sidebar-text);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0 8px 8px;
      opacity: 0.6;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 8px;
      margin-bottom: 2px;
      color: var(--sidebar-text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 450;
      transition: all 0.15s ease;
      cursor: pointer;
      position: relative;
    }

    .nav-item:hover {
      background: var(--sidebar-hover);
      color: #94a3b8;
    }

    .nav-item.active {
      background: var(--sidebar-active-bg);
      color: var(--sidebar-text-active);
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 20px;
      background: var(--sidebar-accent);
      border-radius: 0 2px 2px 0;
    }

    .nav-icon {
      width: 18px;
      text-align: center;
      font-size: 13px;
      flex-shrink: 0;
    }

    .nav-label {
      flex: 1;
    }

    .nav-badge {
      background: var(--sidebar-accent);
      color: white;
      font-size: 10px;
      font-weight: 600;
      padding: 1px 6px;
      border-radius: 10px;
      line-height: 1.6;
    }

    /* ── Footer ── */
    .sidebar-footer {
      padding: 12px 10px 16px;
      border-top: 1px solid var(--sidebar-border);
    }

    .user-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.15s;

      &:hover {
        background: var(--sidebar-hover);
      }
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--sidebar-accent);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }

    .user-name {
      font-size: 12px;
      font-weight: 500;
      color: #e2e8f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 10px;
      color: var(--sidebar-text);
    }

    .online-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-green);
      flex-shrink: 0;
    }
  `],
})
export class SidebarComponent {
  svc = inject(DashboardService);
  navItems: NavItem[] = this.svc.navItems;
}
