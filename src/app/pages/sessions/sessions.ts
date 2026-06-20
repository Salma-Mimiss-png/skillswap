import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule, SidebarComponent],
  templateUrl: './sessions.html',
  styleUrl: './sessions.scss'
})
export class SessionsComponent {
  sessions = [
    { id: '1', skill: 'Développement React', teacher: 'Ahmed Benali', learner: 'Sara Idrissi', date: '2026-06-05', time: '14:00', status: 'confirmée' },
    { id: '2', skill: 'Design UI/UX', teacher: 'Sara Idrissi', learner: 'Nadia Oufkir', date: '2026-06-06', time: '10:00', status: 'en attente' },
    { id: '3', skill: 'Python & ML', teacher: 'Karim Tahir', learner: 'Youssef El Amrani', date: '2026-06-07', time: '16:00', status: 'confirmée' },
    { id: '4', skill: 'Gestion de projet', teacher: 'Nadia Oufkir', learner: 'Ahmed Benali', date: '2026-06-08', time: '09:00', status: 'annulée' },
    { id: '5', skill: 'Angular & TypeScript', teacher: 'Ahmed Benali', learner: 'Karim Tahir', date: '2026-06-09', time: '15:00', status: 'en attente' },
  ];
  filtered = [...this.sessions];
  search = '';

  doSearch() {
    this.filtered = this.sessions.filter(s =>
      s.skill.toLowerCase().includes(this.search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(this.search.toLowerCase()) ||
      s.learner.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  deleteSession(id: string) {
    this.filtered = this.filtered.filter(s => s.id !== id);
  }

  getStatusClass(status: string) {
    if (status === 'confirmée') return 'confirmed';
    if (status === 'en attente') return 'pending';
    return 'cancelled';
  }
}