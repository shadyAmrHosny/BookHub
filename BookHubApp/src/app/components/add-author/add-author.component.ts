import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { Router } from '@angular/router';
interface Author {
  name: string;
  bio: string;
  email: string;
}

@Component({
  selector: 'app-add-author',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './add-author.component.html',
  styleUrl: './add-author.component.css'
})
export class AddAuthorComponent {
  newAuthor: Author = {email: '', bio:'',name:''}
  constructor(private authorService: AuthorService, private router: Router) { }

  addAuthor(): void{
    console.log(1)
    console.log(this.newAuthor)

    this.authorService.addAuthor(this.newAuthor).subscribe((data: any)=>{
      console.log(data)

    });
    this.router.navigate(['/authors']);
  }
}
