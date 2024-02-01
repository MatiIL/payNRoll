import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, User } from '../../generated-types';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { getServerUrl } from '../utils';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = `${getServerUrl()}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient,
    ) {}

    get isLoggedIn$(): Observable<boolean> {
      return this.loggedInSubject.asObservable();
    }

    login(loginRequest: LoginInput): Observable<any> {
      const url = `${this.apiUrl}/login`;
      return this.httpClient.post<User>(url, loginRequest, { observe: 'response' }).pipe(
        tap((response) => {
          const accessToken = response.headers.get('Authorization');
          if (accessToken) {
            // Store the access token in a secure way (e.g., local storage, state management)
            // You may also need to handle token expiration and refreshing
            localStorage.setItem('access_token', accessToken);
          }
        })
      );
    }
  
    yahooAuthenticate(): Observable<any> {
      const url = `${this.apiUrl}/yahoo-authenticate`;
  
      // Include the access token in the headers
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      });
  
      return this.httpClient.get(url, { headers, observe: 'response' });
    }

  logout() {
    const url = `${this.apiUrl}/logout`; 
    return this.httpClient.post(url, { observe: 'response' });
  }
}