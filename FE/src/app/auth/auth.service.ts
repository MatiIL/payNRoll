import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, User } from '../../generated-types';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const getServerUrl = () => {
  if (environment.production) {
    return 'https://paynroll-server.onrender.com'
  } 
  return "http://localhost:9000";
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = `${getServerUrl()}+/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly httpClient: HttpClient) {}

    get isLoggedIn$(): Observable<boolean> {
      return this.loggedInSubject.asObservable();
    }

  login(loginRequest: LoginInput): Observable<any> {
    const url = `${this.apiUrl}/login`; 
    return this.httpClient.post<User>(url, loginRequest, { observe: 'response' });
  }

  logout() {
    const url = `${this.apiUrl}/logout`; 
    return this.httpClient.post(url, { observe: 'response' });
  }
}