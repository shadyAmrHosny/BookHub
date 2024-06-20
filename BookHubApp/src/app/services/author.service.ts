import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Author {
  name: string;
  bio: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/authors';

  constructor(private http: HttpClient) { }

  getAuthors(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getAuthorDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  addAuthor(author : Author): Observable<any>{
    console.log("srv")
    console.log(author)
    // console.log(this.getAllAuthors());
    return this.http.post(`${this.apiUrl}`,author)
  }

  updateAuthor(author: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${author.id}`,author);
  }
  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



}
