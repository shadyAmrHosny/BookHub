import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import {NgForOf,  Location} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

import {ActivatedRoute, RouterLink} from "@angular/router";
import { BookService } from '../../services/book.service';
interface Book {
  title: string;
  description: string;
  authorId?:number
  id?:number
}
@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent {
  updatedBook : Book= { title: '', description: '' };
  constructor(private bookService: BookService,private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.bookService.getBookDetails(bookId).subscribe(data => {
        this.updatedBook.title = data.title;
        this.updatedBook.description=data.description;
        this.updatedBook.id=data.id;
        this.updatedBook.authorId=data.authorId
      });
    } else {
      console.error('author ID is null');
    }
  }
  updateBook(){
    this.bookService.updateBook(this.updatedBook).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate([`/authors/${this.updatedBook.authorId}`])
  }
}
