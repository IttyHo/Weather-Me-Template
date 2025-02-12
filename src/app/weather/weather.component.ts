import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../core/services/weather.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInOut, listAnimation } from './weather.animations';
import { ThemeService } from '../core/services/theme.service';
import { TemperatureService } from '../core/services/temperature.service';
import { ClothingRecommendationService } from '../core/services/clothing-recommendation.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-weather',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule]
})
export class WeatherComponent {}