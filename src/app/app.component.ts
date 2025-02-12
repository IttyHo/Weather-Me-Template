import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { TemperatureService } from './core/services/temperature.service';
import { WeatherService } from './core/services/weather.service';
import { LocationService } from './core/services/location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  displayLoading = false;
    
  constructor(
    private loaderService: LoaderService,
    private temperatureService: TemperatureService,
    private weatherService:WeatherService,
    private locationService:LocationService
    ) {}

  ngOnInit() {
    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
  }

  changeTemperatureUnit() {
    this.temperatureService.toggleUnit();
    // if(!this.temperatureService.isCelsius.getValue())
    // this.weatherService.getForecast(this.locationService?.cityKey);
  }
}
