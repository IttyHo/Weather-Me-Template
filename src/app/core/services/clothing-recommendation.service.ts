import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClothingRecommendationService {
    constructor(private http: HttpClient) { }
    number = 0;

    async getRecommendation(weather: any): Promise<string> {
        console.log('API Key:', environment.openaiApiKey);

    const prompt = `Given the temperature of ${weather.temperature}°C and weather conditions: ${weather.description}, what clothes should I wear today? Give a brief recommendation.`;

        try {
            const response = await lastValueFrom(
                this.http.post('/openai/v1/chat/completions', {
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 100
                }, {
                    headers: {
                        'Authorization': `Bearer ${environment.openaiApiKey}`,
                        'Content-Type': 'application/json'
                    }
                })
            );

            return response['choices'][0]['message']['content'];
        } catch (error) {
            console.error('שגיאה בקבלת המלצות לבוש:', error);
            return 'לא ניתן לקבל המלצות לבוש כרגע.';
        }
    }
}