import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YahooAuthService } from './yahoo-auth.service';

@Injectable({
  providedIn: 'root',
})
export class YahooFantasyService {
  private apiUrl = 'https://fantasysports.yahooapis.com/fantasy/v2';

  constructor(private http: HttpClient, private yahooAuthService: YahooAuthService) {}

  getData(): Observable<any> {
    const accessToken = this.yahooAuthService.getAccessToken();
    if (!accessToken) {
      throw new Error('Access token not available. Please authenticate first.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(`${this.apiUrl}/users;use_login=1/games;game_keys=nfl/teams`, { headers });
  }
}
