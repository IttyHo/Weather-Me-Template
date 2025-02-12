import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      organization: 'org-xxxx', // הכנס כאן את ה-organization ID שלך
      apiKey: environment.openaiApiKey, // מפתח ה-API שלך
    });
    this.openai = new OpenAIApi(configuration);
  }

  // הוסף כאן את המתודות שלך לקריאות ל-OpenAI
} 