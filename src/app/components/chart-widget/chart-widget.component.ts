import {
  Component,
  Input,
  OnChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ChartDataPoint } from '../../models/dashboard.models';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  template: `
    <div class="chart-card">
      <div class="chart-header">
        <div>
          <h3 class="chart-title">{{ title }}</h3>
          <p class="chart-subtitle">{{ subtitle }}</p>
        </div>
        <div class="chart-legend">
          <span class="legend-dot"></span> API calls
        </div>
      </div>
      <div class="chart-wrapper">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 20px;
    }

    .chart-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .chart-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .chart-subtitle {
      font-size: 12px;
      color: var(--color-text-muted);
      margin-top: 2px;
    }

    .chart-legend {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--color-text-secondary);
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      background: var(--color-indigo);
    }

    .chart-wrapper {
      position: relative;
      height: 180px;
    }
  `],
})
export class ChartWidgetComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input({ required: true }) data: ChartDataPoint[] = [];
  @Input() title = 'API Requests';
  @Input() subtitle = 'Thousands of requests per day';

  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private chart: any;

  async ngAfterViewInit() {
    await this.initChart();
  }

  async ngOnChanges() {
    if (this.chart) {
      this.chart.data.labels = this.data.map((d) => d.label);
      this.chart.data.datasets[0].data = this.data.map((d) => d.value);
      this.chart.update();
    }
  }

  private async initChart() {
    const { Chart, registerables } = await import('chart.js');
    Chart.register(...registerables);

    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.map((d) => d.label),
        datasets: [
          {
            data: this.data.map((d) => d.value),
            backgroundColor: (ctx) => {
              const max = Math.max(...this.data.map((d) => d.value));
              return ctx.parsed.y === max
                ? 'rgba(99, 102, 241, 0.9)'
                : 'rgba(99, 102, 241, 0.35)';
            },
            borderColor: 'transparent',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            titleColor: '#94a3b8',
            bodyColor: '#e2e8f0',
            borderColor: '#334155',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}k requests`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: '#94a3b8',
              font: { size: 11, family: 'Inter, sans-serif' },
            },
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false, dash: [4, 4] },
            ticks: {
              color: '#94a3b8',
              font: { size: 11, family: 'Inter, sans-serif' },
              callback: (v) => `${v}k`,
            },
          },
        },
      },
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }
}
