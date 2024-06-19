import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,  // Indicate that this component is standalone
  imports: [CommonModule, FormsModule, RouterModule]  // Include the necessary modules
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  title: string = '';
  author: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(data => {
      this.books = data.books;
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
}
