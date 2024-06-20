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
  authorId?:string
  id?:number
}
@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './author-details.component.html',

  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author: any;
  books: any[] = [];
  newBook: Book = { title: '', description: '' ,authorId:''};


  constructor(private route: ActivatedRoute, private authorService: AuthorService, private bookService: BookService,private router: Router
  ) { }

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.authorService.getAuthorDetails(authorId).subscribe(data => {
        this.author = data;
        this.books=data.books;
      });
    } else {
      console.error('author ID is null');
    }
  }
  deleteBook(id: number){
    this.bookService.deleteBook(id).subscribe(data => {
      console.log(data)
    });
    window.location.reload()
    alert('Book deleted successfully');
  }
  addBook(){
    const author = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.newBook.authorId=author
    this.bookService.addBook(this.newBook).subscribe(data=>{
      console.log(data)
    })
    window.location.reload()

  }


  editBook(id: number){
    this.router.navigate([`/authors/book/${id}`])
  }
  editAuthor(){
    const authorId = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/authors/update-author/${authorId}`])
  }
  deleteAuthor(){
    const authorId = this.route.snapshot.paramMap.get('id');
    // @ts-ignore
    this.authorService.deleteAuthor(authorId).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate([`/authors/`])
  }


}
