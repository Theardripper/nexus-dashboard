// ─── Metric Card ─────────────────────────────────────────────────────────────
export interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  department: string;
  status: 'online' | 'away' | 'offline';
  avatarInitials: string;
  joinedAt: string;
}

// ─── Chart Data ──────────────────────────────────────────────────────────────
export interface ChartDataPoint {
  label: string;
  value: number;
}

// ─── Activity ────────────────────────────────────────────────────────────────
export interface Activity {
  id: number;
  message: string;
  user: string;
  timestamp: string;
  type: 'deploy' | 'user' | 'alert' | 'commit' | 'report';
}

// ─── Nav Item ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}
