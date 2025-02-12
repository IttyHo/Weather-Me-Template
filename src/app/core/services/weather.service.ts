import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { TemperatureService } from './temperature.service';


interface WeatherData {
  date: Date;
  temperature: number;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherApiKey = environment.apiKey;
  private baseApiUrl = '/api';

  constructor(private http: HttpClient,
    private tempertureService:TemperatureService
  ) { }

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(this.baseApiUrl);
  }

  searchLocation(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/locations/v1/cities/autocomplete`, {
      params: {
        apikey: this.weatherApiKey,
        q: query,
        language: 'EN'
      }
    }).pipe(
      tap(response => console.log('Search response:', response))
    );
  }

  async getWeatherData(locationKey: string): Promise<any> {
    debugger;
    const currentUrl = `${this.baseApiUrl}/currentconditions/v1/${locationKey}`;
    const forecastUrl = `${this.baseApiUrl}/forecasts/v1/daily/5day/${locationKey}`;

    const params = {
      apikey: this.weatherApiKey,
      language: 'en-us',

      details:'true'
    };

    try {
      const [current, forecast] = await Promise.all([
        this.http.get(currentUrl, { params }).toPromise(),
        this.http.get(forecastUrl, { params }).toPromise()
      ]);
      return { current, forecast };
    } catch (error) {
      console.error('שגיאה בקבלת נתוני מזג אוויר:', error);
      throw error;
    }
  }

  getWeatherForCity(cityKey: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/currentconditions/v1/${cityKey}`, {
      params: {
        apikey: this.weatherApiKey,
        language: 'EN',
        details: 'true'
      }
    });
  }

  getForecast(cityKey: string): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/forecasts/v1/daily/5day/${cityKey}`, {
      params: {
        apikey: this.weatherApiKey,
        language: 'EN',
        metric: this.tempertureService.isCelsius.getValue(),
        // details:'true'
      }
    });
  }
}
