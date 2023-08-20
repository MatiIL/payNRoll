import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class OpenAiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  apiKey = environment.openAiKey;
 
  constructor(private http: HttpClient) {}

  generatePrompt(messages: any[], temperature: number, maxTokens: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: temperature,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    console.log(body)
  
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error generating prompt:', error);
        throw error;
      })
    );
  }
  

  generateCompletion(messages: any[], temperature: number, maxTokens: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });
    const body = {
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: temperature,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
  
    return this.http.post(this.apiUrl, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error generating completion:', error);
        throw error;
      })
    );
  }
  
}
