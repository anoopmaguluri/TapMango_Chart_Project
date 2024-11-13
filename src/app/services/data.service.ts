import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerData } from '../components/area-chart/area-chart.component';
import { map } from 'rxjs/operators';
import { parseISO } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private basePath = 'assets/data/';

  constructor(private http: HttpClient) { }

  getSteadyGrowthData(): Observable<CustomerData[]> {
    return this.http.get<any[]>(`${this.basePath}steadyGrowthData.json`).pipe(
      map((data) =>
        data.map((item) => ({
          ...item,
          date: parseISO(item.date),
        }))
      )
    );
  }

  getSeasonalFluctuationData(): Observable<CustomerData[]> {
    return this.http.get<any[]>(`${this.basePath}seasonalFluctuationData.json`).pipe(
      map((data) =>
        data.map((item) => ({
          ...item,
          date: parseISO(item.date),
        }))
      )
    );
  }

  getCombinedData(): Observable<CustomerData[]> {
    return this.http.get<any[]>(`${this.basePath}combined-data.json`).pipe(
      map((data) =>
        data.map((item) => ({
          ...item,
          date: parseISO(item.date),
        }))
      )
    );
  }
}
