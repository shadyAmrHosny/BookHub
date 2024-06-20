import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { BookService } from '../../services/book.service';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  standalone: true,  // Indicate that this component is standalone
  imports: [CommonModule]  // Include the necessary modules
})
export class BookDetailsComponent implements OnInit {
  book: any;


  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe(data => {
        this.book = data;
      });
    } else {
      // Handle the case where bookId is null
      console.error('Book ID is null');
    }
  }
}
