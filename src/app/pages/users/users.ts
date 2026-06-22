import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule, SidebarComponent],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class UsersComponent implements OnInit {
  users = [
    { id: '1', name: 'Ahmed Benali', email: 'ahmed@gmail.com', role: 'USER', banned: false },
    { id: '2', name: 'Sara Idrissi', email: 'sara@gmail.com', role: 'USER', banned: false },
    { id: '3', name: 'Karim Tahir', email: 'karim@gmail.com', role: 'USER', banned: true },
    { id: '4', name: 'Nadia Oufkir', email: 'nadia@gmail.com', role: 'USER', banned: false },
    { id: '5', name: 'Youssef El Amrani', email: 'youssef@gmail.com', role: 'USER', banned: false },
  ];
  filtered = [...this.users];
  search = '';

  ngOnInit() { this.filtered = [...this.users]; }

  doSearch() {
    this.filtered = this.users.filter(u =>
      u.name.toLowerCase().includes(this.search.toLowerCase()) ||
      u.email.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  toggleBan(user: any) { user.banned = !user.banned; }
  deleteUser(id: string) { this.filtered = this.filtered.filter(u => u.id !== id); }
  getInitial(name: string) { return name.charAt(0).toUpperCase(); }
}