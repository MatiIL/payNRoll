import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { OAuthConfigService } from '../auth-service/o-auth.config.service'
import { environment } from 'src/environments/environment';
import { firstValueFrom  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YahooAuthService {
  constructor(
    private oauthService: OAuthService,
    private oauthConfigService: OAuthConfigService
    ) {}

    async configureOAuth(): Promise<void> {
      // Fetch OpenID Configuration dynamically
      const openIdConfig = await firstValueFrom(this.oauthConfigService.getOpenIdConfiguration());
  
      // Use the fetched OpenID Configuration in your OAuth configuration
      const authConfig: AuthConfig = {
        issuer: openIdConfig.issuer, // Use the relevant property from OpenID Configuration
        clientId: environment.yahooClientId,
        redirectUri: 'https://pay-n-roll.vercel.app/home',
        responseType: 'token',
      };
  
      this.oauthService.configure(authConfig);
      this.oauthService.setStorage(localStorage);
      this.oauthService.loadDiscoveryDocumentAndLogin();
    }
  
    authenticate(): void {
      this.oauthService.initImplicitFlow();
    }
  
    getAccessToken(): string | null {
      return this.oauthService.getAccessToken();
    }
  }