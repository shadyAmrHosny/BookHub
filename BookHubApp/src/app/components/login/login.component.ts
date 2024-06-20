import { Component, OnInit } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';  // Import CommonModule
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';
import {  AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

interface Admin {
  password: string
  email: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    RouterLink
  ],  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData:Admin = {email: '', password:''}
  constructor(private authService:AuthService, private router: Router,  private cookieService: CookieService) { }

  login(): void {
    console.log(this.loginData);
    this.authService.login(this.loginData).subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1000); // 2 seconds delay
    });
  }


}
