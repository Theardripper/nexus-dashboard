import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="placeholder">
      <div class="logo-mark">◆</div>
      <h1>Nexus Dashboard</h1>
      <p>Project scaffold ready. Components coming next.</p>
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
    h1 { font-size: 22px; font-weight: 600; color: #0f172a; margin: 0; }
    p  { font-size: 14px; color: #64748b; margin: 0; }
  `],
})
export class AppComponent {}
