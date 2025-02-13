import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly http = inject(HttpClient)
  private baseApiUrl = '/api';
  cityKey: any;

  getAutocompleteLocation(searchText: string): Observable<Location[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);
    params = params.append('q', searchText);

    return this.http.get<Location[]>(`${this.baseApiUrl}/locations/v1/cities/autocomplete`,
      { params });
  }

  getLocationByKey(locationKey: string): Observable<Location> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);

    return this.http.get<Location>(`${this.baseApiUrl}/locations/v1/${locationKey}`,
      { params });
  }
}
