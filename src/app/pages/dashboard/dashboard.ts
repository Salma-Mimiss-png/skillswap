import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  stats = [
    { label: 'Utilisateurs', value: '1,240', icon: 'people', color: '#1565c0', bg: '#e8f0fe' },
    { label: 'Compétences', value: '348', icon: 'psychology', color: '#0288d1', bg: '#e1f5fe' },
    { label: 'Sessions', value: '892', icon: 'event', color: '#0277bd', bg: '#e3f2fd' },
    { label: 'En attente', value: '47', icon: 'schedule', color: '#01579b', bg: '#e1f5fe' }
  ];

  recentUsers = [
    { name: 'Ahmed Benali', email: 'ahmed@gmail.com', role: 'USER', status: 'Actif' },
    { name: 'Sara Idrissi', email: 'sara@gmail.com', role: 'USER', status: 'Actif' },
    { name: 'Karim Tahir', email: 'karim@gmail.com', role: 'USER', status: 'Banni' },
    { name: 'Nadia Oufkir', email: 'nadia@gmail.com', role: 'USER', status: 'Actif' },
    { name: 'Youssef El Amrani', email: 'youssef@gmail.com', role: 'USER', status: 'Actif' }
  ];

  constructor(private router: Router) {}
  ngOnInit() {}

  logout() {
    localStorage.removeItem('isAdmin');
    this.router.navigate(['/login']);
  }
}