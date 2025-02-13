import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  public isCelsius = new BehaviorSubject<boolean>(true);
  isCelsius$ = this.isCelsius.asObservable();

  convertTemperature(temp: number, toCelsius: boolean): number {
    if (toCelsius) {
      return (temp - 32) * 5/9;
    }
    return (temp * 9/5) + 32;
  }

 async toggleUnit() {
    debugger;
    
    this.isCelsius.next(!this.isCelsius.value);
   let temp=await this.convertTemperature(58,this.isCelsius.value)
  }
} 