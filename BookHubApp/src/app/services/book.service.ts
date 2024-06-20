import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
  title: string;
  description: string;
  id?:number
}
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    const token = localStorage.getItem('jwt');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}`, { headers });
    } else {
      // Handle the case where the token is not available
      console.error('No token found in local storage');
      return this.http.get(`${this.apiUrl}`);
    }
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
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  addBook(book: Book): Observable<any> {
    return this.http.post(`${this.apiUrl}`,book);
  }
  updateBook(book: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${book.id}`,book);
  }


}
