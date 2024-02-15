import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { getServerUrl } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${getServerUrl()}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(
    private httpClient: HttpClient,
    ) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login(loginRequest: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient
      .post<any>(url, loginRequest, { observe: 'response' })
      .pipe(
        tap((response) => {
          const token = response.body.token; 
          if (token) {
            localStorage.setItem('token', token);
            this.loggedInSubject.next(true);
          } else {
            console.error('No token found in response body');
          }
        })
      );
  }

  logout(): Observable<void> {
    const url = `${this.apiUrl}/logout`;
    return this.httpClient.post<void>(url, { observe: 'response' }).pipe(
      tap(() => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Update loggedInSubject to notify subscribers
        this.loggedInSubject.next(false);
      })
    );
  }

  getToken(): string | null {
    // Get token from local storage and assert that it is not null
    return (this.token || localStorage.getItem('token')) as string | null;
  }
}
