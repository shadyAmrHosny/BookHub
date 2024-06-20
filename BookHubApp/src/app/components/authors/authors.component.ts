import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";

interface Author {
  name: string;
  bio: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 2;
  newAuthor: Author | any

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.fetchAuthors();
   // this.getAuthors();
  }

  fetchAuthors(): void {
    this.authorService.getAuthors(this.currentPage, this.pageSize).subscribe((data: any) => {
     // console.log('API Response:', data); // Debugging line
      this.authors = data.items;
      this.totalItems = data.totalItems;
      this.currentPage = data.currentPage;
      console.log(this.authors)
    }, (error) => {
      console.error('Error fetching authors:', error);
    });
  }
  getAuthors():void{
    this.authorService.getAllAuthors().subscribe((data: any) =>{
      this.authors=data.items;
      console.log(this.authors)
    })
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage++;
      this.fetchAuthors();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAuthors();
    }
  }


  protected readonly Math = Math;
}
