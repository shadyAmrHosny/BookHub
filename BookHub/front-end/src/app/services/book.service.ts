import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8000/api/v1/books';

  constructor(private http: HttpClient) {}

  getAllBooks(title?: string, author?: string): Observable<any> {
    let params = new HttpParams();
    if (title) {
      params = params.append('title', title);
    }
    if (author) {
      params = params.append('author', author);
    }
    return this.http.get(this.baseUrl, { params });
  }
}
