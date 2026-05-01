import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, interval, map } from 'rxjs';
import {
  Metric,
  User,
  ChartDataPoint,
  Activity,
  NavItem,
} from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // ─── Signals ───────────────────────────────────────────────────────────────
  activeRoute = signal<string>('overview');

  // ─── Nav ───────────────────────────────────────────────────────────────────
  readonly navItems: NavItem[] = [
    { label: 'Overview',  icon: '◈', route: 'overview' },
    { label: 'Analytics', icon: '◉', route: 'analytics' },
    { label: 'Users',     icon: '◎', route: 'users',    badge: 3 },
    { label: 'Projects',  icon: '◇', route: 'projects' },
    { label: 'Reports',   icon: '◈', route: 'reports' },
    { label: 'Settings',  icon: '◌', route: 'settings' },
  ];

  // ─── Metrics ───────────────────────────────────────────────────────────────
  private metricsSubject = new BehaviorSubject<Metric[]>([
    { label: 'Total Users',   value: '24,812', delta: '+12.4%', trend: 'up',     icon: '👥' },
    { label: 'MRR',           value: '$48.2k', delta: '+8.1%',  trend: 'up',     icon: '💰' },
    { label: 'Requests / s',  value: '3,291',  delta: '-2.3%',  trend: 'down',   icon: '⚡' },
    { label: 'Uptime',        value: '99.9%',  delta: 'stable', trend: 'neutral',icon: '🟢' },
  ]);
  metrics$ = this.metricsSubject.asObservable();

  // ─── Chart ─────────────────────────────────────────────────────────────────
  private chartSubject = new BehaviorSubject<ChartDataPoint[]>([
    { label: 'Mon', value: 62 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 88 },
    { label: 'Thu', value: 71 },
    { label: 'Fri', value: 95 },
    { label: 'Sat', value: 58 },
    { label: 'Sun', value: 83 },
  ]);
  chartData$ = this.chartSubject.asObservable();

  // ─── Users ─────────────────────────────────────────────────────────────────
  private usersSubject = new BehaviorSubject<User[]>([
    { id: 1, name: 'Ana Lima',    email: 'ana@nexus.io',    role: 'Admin',  department: 'Engineering', status: 'online',  avatarInitials: 'AL', joinedAt: '2023-03-12' },
    { id: 2, name: 'Carlos M.',   email: 'carlos@nexus.io', role: 'Editor', department: 'DevOps',      status: 'online',  avatarInitials: 'CM', joinedAt: '2023-07-08' },
    { id: 3, name: 'Sofia T.',    email: 'sofia@nexus.io',  role: 'Viewer', department: 'Design',      status: 'away',    avatarInitials: 'ST', joinedAt: '2024-01-19' },
    { id: 4, name: 'Rafael N.',   email: 'rafael@nexus.io', role: 'Editor', department: 'Backend',     status: 'offline', avatarInitials: 'RN', joinedAt: '2023-11-04' },
    { id: 5, name: 'Bianca P.',   email: 'bianca@nexus.io', role: 'Admin',  department: 'Product',     status: 'online',  avatarInitials: 'BP', joinedAt: '2022-09-27' },
  ]);
  users$ = this.usersSubject.asObservable();

  // ─── Activity ──────────────────────────────────────────────────────────────
  private activitySubject = new BehaviorSubject<Activity[]>([
    { id: 1, message: 'Production deploy completed successfully',  user: 'Ana Lima',  timestamp: '2 min ago',  type: 'deploy' },
    { id: 2, message: 'New user registered: john.doe@email.com',  user: 'System',    timestamp: '11 min ago', type: 'user' },
    { id: 3, message: 'High CPU alert on node-prod-03 resolved',  user: 'Carlos M.', timestamp: '34 min ago', type: 'alert' },
    { id: 4, message: 'API v2.4.1 merged to main branch',         user: 'Rafael N.', timestamp: '1 hr ago',   type: 'commit' },
    { id: 5, message: 'Monthly usage report generated & sent',    user: 'System',    timestamp: '3 hr ago',   type: 'report' },
  ]);
  activity$ = this.activitySubject.asObservable();

  // ─── Live requests ticker ──────────────────────────────────────────────────
  requestsPerSecond$ = interval(1500).pipe(
    map(() => Math.floor(3100 + Math.random() * 400))
  );

  // ─── Methods ───────────────────────────────────────────────────────────────
  setActiveRoute(route: string): void {
    this.activeRoute.set(route);
  }

  getUsersByStatus(status: User['status']): User[] {
    return this.usersSubject.value.filter((u) => u.status === status);
  }

  getOnlineCount(): number {
    return this.getUsersByStatus('online').length;
  }
}
