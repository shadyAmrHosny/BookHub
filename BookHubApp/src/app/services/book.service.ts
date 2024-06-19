import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  searchBooksByTitle(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?title=${title}`);
  }

  searchBooksByAuthor(author: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?author=${author}`);
  }

  getBookDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
