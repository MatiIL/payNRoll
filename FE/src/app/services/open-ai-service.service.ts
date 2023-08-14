import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  constructor(private http: HttpClient) {}

  generatePrompt(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`,
    });
    const body = {
      prompt: prompt,
      max_tokens: 50, // You can adjust this value based on your needs
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  generateCompletion(prompt: string, temperature: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`,
    });
    const body = {
      prompt: prompt,
      temperature: temperature,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}