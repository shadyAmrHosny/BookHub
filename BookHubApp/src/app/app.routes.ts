import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { AuthorsComponent } from './components/authors/authors.component';
import {AddAuthorComponent } from './components/add-author/add-author.component'
import {AuthorDetailsComponent} from './components/author-details/author-details.component'
import { UpdateBookComponent} from './components/update-book/update-book.component'
import {UpdateAuthorComponent} from './components/update-author/update-author.component'
export const routes: Routes = [
  {path: '',component:LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/add',component: AddAuthorComponent},
  {path: 'authors/:id', component:AuthorDetailsComponent},
  {path:'authors/book/:id',component:UpdateBookComponent},
  {path: 'authors/update-author/:id',component:UpdateAuthorComponent}


];
