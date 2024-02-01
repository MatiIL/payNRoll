import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, User } from '../../generated-types';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { YahooAuthService } from '../services/yahoo-service/yahoo-auth.service';
import { getServerUrl } from '../utils';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = `${getServerUrl()}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly yahooAuthService: YahooAuthService,
    ) {}

    get isLoggedIn$(): Observable<boolean> {
      return this.loggedInSubject.asObservable();
    }

  login(loginRequest: LoginInput): Observable<any> {
    const url = `${this.apiUrl}/login`; 
    return this.httpClient.post<User>(url, loginRequest, { withCredentials: true, observe: 'response' }).pipe(
      tap(() => {
        this.yahooAuthService.authenticate();
      })
    );
  }

  logout() {
    const url = `${this.apiUrl}/logout`; 
    return this.httpClient.post(url, { observe: 'response' });
  }
}