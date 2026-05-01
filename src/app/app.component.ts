import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  template: `
    <div class="app-shell">
      <app-sidebar />
      <div class="main-area">
        <app-topbar />
        <main class="content-area">
          <p>Layout shell done. Metric cards and charts coming next.</p>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: var(--color-bg);
    }
    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      font-family: Inter, sans-serif;
      font-size: 14px;
      color: var(--color-text-secondary);
    }
  `],
})
export class AppComponent {}
