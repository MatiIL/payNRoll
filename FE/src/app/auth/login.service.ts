import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInput, User } from '../../generated-types'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:9000/auth';

  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: LoginInput) {
    const url = `${this.apiUrl}/login`; 
    return this.httpClient.post<User>(url, loginRequest);
  }
}