import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './theme-toggle.page.html',
  styleUrl: './theme-toggle.page.scss',
  standalone: true
})
export class ThemeTogglePage {

  readonly themeService = inject(ThemeService)
  isDark$ = this.themeService.isDarkTheme$;
  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
