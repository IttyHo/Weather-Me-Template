import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  isCelsiusSignal = signal<boolean>(true);

  convertTemperature(temp: number, toCelsius: boolean): number {
    if (toCelsius) {
      return (temp - 32) * 5 / 9;
    }
    return (temp * 9 / 5) + 32;
  }
  
  async toggleUnit() {
    this.isCelsiusSignal.set(!this.isCelsiusSignal());  }
}  