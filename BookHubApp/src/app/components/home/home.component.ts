import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';

import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]  // Include the necessary modules
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  title: string = '';
  author: string = '';

  constructor(private bookService: BookService,private router: Router) {}

  ngOnInit(): void {
   // window.location.reload();
    this.bookService.getBooks().subscribe(data => {
      this.books = data.books;
      console.log(this.books)
    });
  }

  searchByTitle(): void {
    this.bookService.searchBooksByTitle(this.title).subscribe(data => {
      this.books = data.books;
    });
  }

  searchByAuthor(): void {
    this.bookService.searchBooksByAuthor(this.author).subscribe(data => {
      this.books = data.books;
    });
  }
  logout(): void {
    // Clear the JWT token from local storage
    localStorage.removeItem('token');

    // Navigate to the login page or home page
    this.router.navigate(['/']);
  }
}
