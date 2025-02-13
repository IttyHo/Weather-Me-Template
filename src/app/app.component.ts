import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { TemperatureService } from './core/services/temperature.service';
import { WeatherService } from './core/services/weather.service';
import { LocationService } from './core/services/location.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ThemeTogglePage } from './weather/weather/pages/theme-toggle/theme-toggle.page';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatIconModule,
    RouterOutlet,
    ThemeTogglePage
  ],

})
export class AppComponent implements OnInit {
  displayLoading = false;
  readonly temperatureService=inject(TemperatureService)
  readonly loaderService=inject(LoaderService)

  ngOnInit() {
    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
  }

  changeTemperatureUnit() {
    this.temperatureService.toggleUnit();
  }
}
