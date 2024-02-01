import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OAuthConfigService {
  private openIdConfigUrl = 'https://api.login.yahoo.com/.well-known/openid-configuration';

  constructor(private http: HttpClient) {}

  getOpenIdConfiguration(): Observable<any> {
    return this.http.get(this.openIdConfigUrl);
  }
}