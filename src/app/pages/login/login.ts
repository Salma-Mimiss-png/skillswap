import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';

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
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private router: Router) {}

  async login() {
    this.loading = true;
    this.errorMessage = '';
    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
      localStorage.setItem('isAdmin', 'true');
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      this.errorMessage = 'Email ou mot de passe incorrect';
    } finally {
      this.loading = false;
    }
  }
}