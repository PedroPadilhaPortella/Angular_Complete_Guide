import { input, Pipe, PipeTransform } from '@angular/core';

type TemperatureType = 'C' | 'F';

@Pipe({
  name: 'temperature',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  transform(
    input: string | number,
    inputType: TemperatureType = 'C',
    outputType?: TemperatureType
  ): string {
    let value = (typeof input === 'string') ? parseFloat(input) : input;

    let temperature = value;

    if (inputType === 'C' && outputType === 'F') {
      temperature = value * (9 / 5) + 32;
    } else if (inputType === 'F' && outputType === 'C') {
      temperature = (value - 32) * (5 / 9);
    }

    return `${temperature.toFixed(2)} °${outputType ? outputType : inputType}`;
  }
}