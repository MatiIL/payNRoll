import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YahooApiService {
  private readonly yahooApiUrl = 'https://api.login.yahoo.com/oauth2';

  constructor(private readonly http: HttpClient) {}

  initiateAuthentication(): void {
    // Redirect the user to Yahoo's authentication page
    window.location.href = `${this.yahooApiUrl}/request_auth?${this.getAuthQueryString()}`;
  }

  exchangeCodeForTokens(code: string): Observable<any> {
    const tokenData = {
      client_id: environment.yahooClientId,
      client_secret: environment.yahooClientSecret,
      redirect_uri: 'https://pay-n-roll.vercel.app/home',
      code,
      grant_type: 'authorization_code',
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = { headers };

    const body = new HttpParams({ fromObject: tokenData });

    return this.http.post(`${this.yahooApiUrl}/get_token`, body.toString(), options);
  }

  private getAuthQueryString(): string {
    const authData = {
      client_id: environment.yahooClientId,
      redirect_uri: 'https://pay-n-roll.vercel.app/home',
      response_type: 'code',
      language: 'en-us',
    };

    return Object.entries(authData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  }
}
