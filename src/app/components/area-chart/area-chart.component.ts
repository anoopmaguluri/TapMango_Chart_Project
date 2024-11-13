import { Component, OnInit, Inject, PLATFORM_ID, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';
import { subMonths, subQuarters, subYears, isWithinInterval } from 'date-fns';

import { AverageCalculationService } from '../../services/averageprice.service';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

export interface CustomerData {
  date: Date;
  allCustomers: number;
  loyaltyCustomers: number;
}

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
})

export class AreaChartComponent implements OnInit {
  dataServiceMethod = input<() => Observable<CustomerData[]>>();
  chartTitle = input('Area Chart');
  chartId = input('defaultChartId');

  public selected = 'last-year';
  private chart: Chart | undefined;
  private allData: CustomerData[] = [];

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private averageCalculationService: AverageCalculationService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables);
      if (isPlatformBrowser(this.platformId)) {
        Chart.register(...registerables, annotationPlugin);
        import('chartjs-plugin-zoom').then((module) => {
          const zoomPlugin = module.default;
          Chart.register(zoomPlugin);
        });
      }
    }
  }

  ngOnInit(): void {
    const dataServiceMethod = this.dataServiceMethod();
    if (dataServiceMethod) {
      dataServiceMethod().subscribe((data) => {
        this.allData = data.map((item) => ({
          ...item,
          date: new Date(item.date),
        }));
        if (isPlatformBrowser(this.platformId)) {
          this.initializeChart();
          this.updateChartData('last-year');
        }
      });

    } else {
      console.error('No data service method provided.');
    }
  }


  private initializeChart(): void {
    const ctx = document.getElementById(this.chartId()) as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'All Customers',
              data: [],
              borderColor: '#e3a623',
              backgroundColor: 'rgba(227, 166, 35, 0.2)', // Faded fill color
              fill: true,
            },
            {
              label: 'Loyalty Customers',
              data: [],
              borderColor: '#2cbbe5',
              backgroundColor: 'rgba(44, 187, 229, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'PP',
              },
              grid: {
                display: false
              },
            },
            y: {
              title: {
                display: true,
                text: 'Average Ticket Size ($)',
              },
              grid: {
                display: true
              },
              border: {
                dash: [4, 3]
              }
            },
          },
          plugins: {
            legend: {
              labels: {
                boxWidth: 10,
                boxHeight: 10,
              }
            },
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
        },
      });
    } else {
      console.error('Canvas element not found');

    }
  }

  onFilterChange(event: MatSelectChange): void {
    const selectElement = event.value;
    this.selected = selectElement;
    if (isPlatformBrowser(this.platformId)) {
      this.updateChartData(this.selected);
    }
  }

  private updateChartData(filter: string): void {
    const filteredData = this.filterDataByRange(filter);
    if (this.chart) {
      this.chart.data.labels = filteredData.map((d) => d.date);
      this.chart.data.datasets[0].data = filteredData.map(
        (d) => d.allCustomers
      );
      this.chart.data.datasets[1].data = filteredData.map(
        (d) => d.loyaltyCustomers
      );

      const allCustomersAvg = this.averageCalculationService.calculateAverage(
        filteredData.map((d) => d.allCustomers)
      );
      const loyaltyCustomersAvg = this.averageCalculationService.calculateAverage(
        filteredData.map((d) => d.loyaltyCustomers)
      );

      this.chart.options.plugins!.annotation!.annotations = {
        allCustomersLine: {
          type: 'line',
          yMin: allCustomersAvg,
          yMax: allCustomersAvg,
          borderColor: '#FF5733',
          borderWidth: 2,
          label: {
            content: `All Customers Avg: $${allCustomersAvg.toFixed(2)}`,
            display: true,
            position: 'end',
          },
        },
        loyaltyCustomersLine: {
          type: 'line',
          yMin: loyaltyCustomersAvg,
          yMax: loyaltyCustomersAvg,
          borderColor: '#33FF57',
          borderWidth: 2,
          label: {
            content: `Loyalty Customers Avg: $${loyaltyCustomersAvg.toFixed(2)}`,
            display: true,
            position: 'end',
          },
        },
      };

      this.chart.update();
    }
  }

  private filterDataByRange(range: string): CustomerData[] {
    const endDate = new Date();
    let startDate: Date;

    switch (range) {
      case 'last-month':
        startDate = subMonths(endDate, 1);
        break;
      case 'last-quarter':
        startDate = subQuarters(endDate, 1);
        break;
      case 'last-year':
        startDate = subYears(endDate, 1);
        break;
      default:
        startDate = subMonths(endDate, 1);
        break;
    }

    const filtered = this.allData.filter((data) =>
      isWithinInterval(data.date, { start: startDate, end: endDate })
    );
    return filtered;
  }
}