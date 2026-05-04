import { Component, Input } from '@angular/core';
import { User } from '../../models/dashboard.models';

@Component({
  selector: 'app-users-table',
  standalone: true,
  template: `
    <div class="table-card">
      <div class="table-header">
        <div>
          <h3 class="table-title">Team Members</h3>
          <p class="table-subtitle">{{ users.length }} members total</p>
        </div>
        <button class="btn-invite">+ Invite</button>
      </div>

      <table class="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Department</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users; track user.id) {
            <tr>
              <td>
                <div class="user-cell">
                  <div class="user-avatar" [style.background]="avatarColor(user.role)">
                    {{ user.avatarInitials }}
                  </div>
                  <div class="user-info">
                    <span class="user-name">{{ user.name }}</span>
                    <span class="user-email">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              <td class="text-secondary">{{ user.department }}</td>
              <td>
                <span class="role-badge" [class]="'role-' + user.role.toLowerCase()">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <div class="status-cell">
                  <span class="status-dot" [class]="'status-' + user.status"></span>
                  <span class="status-label">{{ user.status }}</span>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 20px 14px;
      border-bottom: 1px solid var(--color-border);
    }

    .table-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .table-subtitle {
      font-size: 12px;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .btn-invite {
      font-size: 12px;
      font-weight: 500;
      color: var(--color-indigo);
      background: var(--color-indigo-light);
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      transition: opacity 0.15s;

      &:hover { opacity: 0.8; }
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;

      th {
        font-size: 11px;
        font-weight: 600;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        text-align: left;
        padding: 10px 20px;
        border-bottom: 1px solid var(--color-border);
        background: var(--color-bg);
      }

      td {
        padding: 12px 20px;
        font-size: 13px;
        color: var(--color-text-primary);
        border-bottom: 1px solid var(--color-border);
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover td {
        background: rgba(0, 0, 0, 0.015);
      }
    }

    .text-secondary {
      color: var(--color-text-secondary) !important;
    }

    .user-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
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
      gap: 1px;
    }

    .user-name {
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .user-email {
      font-size: 11px;
      color: var(--color-text-muted);
    }

    .role-badge {
      font-size: 11px;
      font-weight: 500;
      padding: 3px 9px;
      border-radius: 20px;

      &.role-admin  { background: rgba(99,102,241,.12); color: #6366f1; }
      &.role-editor { background: rgba(245,158,11,.12); color: #d97706; }
      &.role-viewer { background: rgba(100,116,139,.12); color: #64748b; }
    }

    .status-cell {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      flex-shrink: 0;

      &.status-online  { background: var(--color-green); }
      &.status-away    { background: var(--color-amber); }
      &.status-offline { background: var(--color-border); }
    }

    .status-label {
      font-size: 12px;
      color: var(--color-text-secondary);
      text-transform: capitalize;
    }
  `],
})
export class UsersTableComponent {
  @Input({ required: true }) users: User[] = [];

  avatarColor(role: User['role']): string {
    const colors: Record<string, string> = {
      Admin: '#6366f1',
      Editor: '#f59e0b',
      Viewer: '#64748b',
    };
    return colors[role] ?? '#64748b';
  }
}
