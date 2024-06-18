import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  title: string = '';
  author: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAllBooks(this.title, this.author).subscribe(data => {
      this.books = data.books;
    });
  }

  searchByTitle(): void {
    this.getBooks();
  }

  searchByAuthor(): void {
    this.getBooks();
  }
}
