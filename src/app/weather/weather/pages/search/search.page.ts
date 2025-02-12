import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../../core/services/weather.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { TemperatureService } from '../../../../core/services/temperature.service';
import { ClothingRecommendationService } from '../../../../core/services/clothing-recommendation.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
  ],
  standalone: true,
})
export class SearchPage implements OnInit {
  currentWeather: any;
  forecast: any[];
  searchResults: any[];
  favorites: string[] = [];
  isLoading = false;
  clothingRecommendation: string;
  isDarkTheme$ = this.themeService.isDarkTheme$;
  isCelsius$ = this.temperatureService.isCelsius$;
  searchControl = new FormControl('');
  
  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    private locationService:LocationService,
    private temperatureService: TemperatureService,
    private clothingService: ClothingRecommendationService
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.weatherService.searchLocation('Tel Aviv').subscribe({
      next: (results) => {
        if (Array.isArray(results) && results.length > 0) {
          const firstResult = results[0];
          if (firstResult && firstResult.Key) {
            this.getWeatherForCity(firstResult.Key);
            this.searchControl.setValue(firstResult.LocalizedName || 'Tel Aviv', { emitEvent: false });
          } else {
            this.showError('לא נמצאו תוצאות עבור תל אביב');
          }
        } else {
          this.showError('לא נמצאו תוצאות עבור תל אביב');
        }
      },
      error: (error) => {
        console.error('שגיאה בחיפוש תל אביב:', error);
        this.showError('שגיאה בטעינת מזג האוויר');
      }
    });
    
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => value?.length >= 2),
      switchMap(value => this.weatherService.searchLocation(value))
    ).subscribe({
      next: (results) => {
        this.searchResults = results;
      },
      error: (error) => {
        this.showError('שגיאה בחיפוש המיקום');
      }
    });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async getWeatherForCity(cityKey: string) {
    try {
      const [current, forecast] = await Promise.all([
        this.weatherService.getWeatherForCity(cityKey).toPromise(),
        this.weatherService.getForecast(cityKey).toPromise()
      ]);

      this.currentWeather = {
        city: this.searchControl.value,
        temperature: current[0].Temperature.Metric.Value,
        description: current[0].WeatherText
      };

      this.forecast = forecast.DailyForecasts.map(day => ({
        date: new Date(day.Date),
        temperature: day.Temperature.Maximum.Value,
        description: day.Day.IconPhrase
      }));

      if (this.currentWeather) {
        this.clothingRecommendation = await this.clothingService
          .getRecommendation(this.currentWeather);
          await this.delay(5000); 

      }
    } catch (error) {
      this.showError('שגיאה בטעינת מזג האוויר');
    }
  }

   delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isFavorite(city: string): boolean {
    return this.favorites.includes(city);
  }

  toggleFavorite(city: string): void {
    if (this.isFavorite(city)) {
      this.favorites = this.favorites.filter(f => f !== city);
    } else {
      this.favorites.push(city);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }
  onCitySelect(result: any) {
    this.locationService.cityKey=result.Key
    if (result && result.Key) {
      this.getWeatherForCity(result.Key);
    }
  }
}

