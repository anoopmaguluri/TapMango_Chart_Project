// average-calculation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AverageCalculationService {
    calculateAverage(values: number[]): number {
        const sum = values.reduce((a, b) => a + b, 0);
        return values.length ? sum / values.length : 0;
    }
}
