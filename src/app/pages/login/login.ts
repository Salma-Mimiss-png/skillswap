import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  remember: boolean = false;

  constructor(private router: Router) {}

  login() {
    if (this.email === 'admin@skillswap.com' && this.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Email ou mot de passe incorrect');
    }
  }
}