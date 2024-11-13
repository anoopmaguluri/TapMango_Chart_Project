import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateAverage',
  standalone: true
})
export class CalculateAveragePipe implements PipeTransform {
  transform(values: number[]): number {
    if (!values || values.length === 0) {
      return 0;
    }
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  }
}
