# ◆ Nexus Dashboard

> A production-ready **Angular 17** admin panel with dark sidebar, real-time metrics, interactive charts and user management.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4-FF6384?style=flat-square&logo=chartdotjs)
![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)

---

## ✨ Features

- **Angular 17 Standalone Components** — no NgModules, modern signals-based architecture
- **Reactive data layer** — RxJS BehaviorSubjects + Angular Signals for live updates
- **Live metrics ticker** — real-time requests/second counter updating every 1.5s
- **Interactive bar chart** — Chart.js 4 with custom tooltips and dynamic color highlighting
- **Users table** — role badges, department info, and live status indicators
- **Activity feed** — categorized event log with icons
- **Dark sidebar** — collapsible-ready navigation with badges and user profile
- **Responsive layout** — adapts gracefully to tablet and mobile breakpoints
- **Typed models** — strict TypeScript interfaces for all data structures
- **SCSS theming** — CSS custom properties for consistent design tokens

---

## 🗂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── sidebar/          # Dark sidebar with navigation
│   │   ├── topbar/           # Header with live ticker & notifications
│   │   ├── metric-card/      # Stat cards with trend indicators
│   │   ├── chart-widget/     # Bar chart (Chart.js)
│   │   ├── users-table/      # Team members table
│   │   └── activity-feed/    # Recent activity log
│   ├── models/
│   │   └── dashboard.models.ts   # TypeScript interfaces
│   ├── pages/
│   │   └── overview/         # Main dashboard page
│   ├── services/
│   │   └── dashboard.service.ts  # Data service with RxJS streams
│   ├── app.component.ts      # Root shell layout
│   ├── app.config.ts         # Application config
│   └── app.routes.ts         # Client-side routing
└── styles.scss               # Global styles & CSS variables
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+  
- [Angular CLI](https://angular.io/cli) 17+

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
# Clone the repository
git clone https://github.com/your-username/nexus-dashboard.git
cd nexus-dashboard

# Install dependencies
npm install

# Start development server
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build for Production

```bash
ng build
```

The output will be in `dist/nexus-dashboard/`.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Angular 17 | Framework (standalone components) |
| TypeScript 5.4 | Type-safe JavaScript |
| RxJS 7 | Reactive data streams |
| Angular Signals | Fine-grained reactivity |
| Chart.js 4 | Interactive charts |
| SCSS | Styling with CSS variables |
| Angular Router | Client-side navigation |

---

## 📸 Screenshots

![alt text](<Captura de tela de 2026-05-04 15-38-57.png>)

---

## 🔧 Extending the Project

### Adding a new page

1. Generate a component: `ng generate component pages/my-page --standalone`
2. Add a route in `app.routes.ts`
3. Add a nav item in `dashboard.service.ts`

### Connecting a real API

Replace the `BehaviorSubject` mock data in `dashboard.service.ts` with `HttpClient` calls:

```ts
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);

  metrics$ = this.http.get<Metric[]>('/api/metrics');
}
```

Don't forget to add `provideHttpClient()` in `app.config.ts`.

---

### Made by Luiz Eduardo da Silva Moura
