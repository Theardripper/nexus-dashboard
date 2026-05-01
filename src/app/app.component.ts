import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { Metric } from './models/dashboard.models';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="placeholder">
      <div class="logo-mark">◆</div>
      <h1>Nexus Dashboard</h1>
      <p>Data layer ready — {{ metrics.length }} metrics loaded from service.</p>
      <ul>
        @for (m of metrics; track m.label) {
          <li><strong>{{ m.label }}</strong>: {{ m.value }}</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      height: 100vh;
      font-family: Inter, sans-serif;
    }
    .logo-mark { font-size: 32px; color: #6366f1; }
    h1  { font-size: 22px; font-weight: 600; color: #0f172a; margin: 0; }
    p   { font-size: 14px; color: #64748b; margin: 0; }
    ul  { list-style: none; padding: 0; font-size: 13px; color: #475569; }
    li  { padding: 2px 0; }
  `],
})
export class AppComponent implements OnInit {
  private svc = inject(DashboardService);
  metrics: Metric[] = [];

  ngOnInit() {
    this.svc.metrics$.subscribe(m => this.metrics = m);
  }
}
