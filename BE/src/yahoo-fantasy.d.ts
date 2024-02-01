declare module 'yahoo-fantasy' {
    import { Request, Response } from 'express';
  
    interface AuthData {
      client_id: string;
      redirect_uri: string;
      response_type: string;
      state?: string;
    }
  
    interface TokenData {
      client_id: string;
      client_secret: string;
      redirect_uri: string;
      code: string;
      grant_type: string;
      state?: string;
    }
  
    interface YahooFantasyOptions {
      consumerKey: string;
      consumerSecret: string;
      tokenCallbackFn: Function;
      redirectUri: string;
    }
  
    interface YahooFantasyResponse {
      on(event: string, callback: Function): void;
    }
  
    interface YahooFantasyApiOptions {
      format: string;
      oauth_consumer_key?: string;
      oauth_signature_method?: string;
      oauth_timestamp?: number;
      oauth_nonce?: string;
      oauth_version?: string;
      oauth_signature?: string;
    }
  
    class YahooFantasy {
      constructor(options: YahooFantasyOptions);
  
      auth(res: Response, state?: string): void;
      authCallback(req: { query: { code: string; state: string } }): Promise<{ access_token: string; refresh_token: string; state: string }>;
      setUserToken(token: string): void;
      setRefreshToken(token: string): void;
      refreshToken(cb: Function): void;
      api(method: string, url: string, accessToken: string, postData?: any): Promise<any>;
  
      yahooUserToken: string | null;
      yahooRefreshToken: string | null;
  
      // Add other methods and properties based on your actual implementation
    }
  
    export = YahooFantasy;
  }
  