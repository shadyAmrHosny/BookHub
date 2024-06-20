import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import {NgForOf,  Location} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

import {ActivatedRoute, RouterLink} from "@angular/router";

interface Author {
  name: string;
  email: string;
  bio:string;
  id?:number;
}
@Component({
  selector: 'app-update-author',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './update-author.component.html',
  styleUrl: './update-author.component.css'
})
export class UpdateAuthorComponent {
  updatedAuthor : Author= { name: '', email: '', bio:'' };
  constructor(private authorService: AuthorService,private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const AuthorId = this.route.snapshot.paramMap.get('id');
    if (AuthorId) {
      this.authorService.getAuthorDetails(AuthorId).subscribe(data => {
        this.updatedAuthor.name=data.name
        this.updatedAuthor.email = data.email;
        this.updatedAuthor.bio=data.bio;
        this.updatedAuthor.id=data.id;
      });
    } else {
      console.error('author ID is null');
    }
  }

  updateAuthor(){
    this.authorService.updateAuthor(this.updatedAuthor).subscribe(data=>{
      console.log(data)
    })
    this.router.navigate([`/authors/${this.updatedAuthor.id}`])
  }

}
