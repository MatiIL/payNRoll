import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, User } from '../../generated-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/auth';

  constructor(
    private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginInput): Observable<any> {
    const url = `${this.apiUrl}/login`; 
    return this.httpClient.post<User>(url, loginRequest, { observe: 'response' });
  }

  logout() {
    const url = `${this.apiUrl}/logout`; 
    return this.httpClient.post(url, { observe: 'response' });
  }
}