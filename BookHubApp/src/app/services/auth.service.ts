import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Admin {
  email: string;
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(admin: Admin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,admin);
  }

}
