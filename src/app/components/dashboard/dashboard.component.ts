import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaChartComponent } from '../area-chart/area-chart.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AreaChartComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  charts: Array<{
    dataServiceMethod: () => Observable<any>;
    title: string;
    chartId: string;
  }> = [];
  gridColumns = 2;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.charts = [
      {
        dataServiceMethod: this.dataService.getCombinedData.bind(this.dataService),
        title: 'Combined Data Chart',
        chartId: 'combinedDataChart',
      },
      {
        dataServiceMethod: this.dataService.getSteadyGrowthData.bind(this.dataService),
        title: 'Steady Growth Chart',
        chartId: 'steadyGrowthChart',
      },
      {
        dataServiceMethod: this.dataService.getSeasonalFluctuationData.bind(this.dataService),
        title: 'Seasonal Fluctuation Chart',
        chartId: 'seasonalFluctuationChart',
      },

    ];
  }
} 