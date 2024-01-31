import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class YahooAuthService {
  constructor(private oauthService: OAuthService) {}

  configureOAuth(): void {
    console.log('Configuring OAuth...');
    
    const authConfig: AuthConfig = {
      issuer: 'https://api.login.yahoo.com/oauth2/request_auth',
      clientId: environment.yahooClientId,
      redirectUri: 'https://pay-n-roll.vercel.app/home',
      responseType: 'token',
    };

    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  authenticate(): void {
    console.log('Authenticating...');
    this.oauthService.initImplicitFlow();
  }

  getAccessToken(): string | null {
    const accessToken = this.oauthService.getAccessToken();
    console.log('Access Token:', accessToken);
    return accessToken;
  }
}
