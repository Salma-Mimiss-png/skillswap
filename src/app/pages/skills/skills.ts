import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule, SidebarComponent],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  skills = [
    { id: '1', title: 'Développement React', category: 'Informatique', level: 'Expert', userName: 'Ahmed Benali', rating: 4.8 },
    { id: '2', title: 'Design UI/UX', category: 'Design', level: 'Intermédiaire', userName: 'Sara Idrissi', rating: 4.5 },
    { id: '3', title: 'Python & Machine Learning', category: 'Informatique', level: 'Expert', userName: 'Karim Tahir', rating: 4.9 },
    { id: '4', title: 'Gestion de projet', category: 'Management', level: 'Intermédiaire', userName: 'Nadia Oufkir', rating: 4.2 },
    { id: '5', title: 'Marketing Digital', category: 'Marketing', level: 'Débutant', userName: 'Youssef El Amrani', rating: 3.9 },
    { id: '6', title: 'Angular & TypeScript', category: 'Informatique', level: 'Expert', userName: 'Ahmed Benali', rating: 4.7 },
  ];
  filtered = [...this.skills];
  search = '';

  doSearch() {
    this.filtered = this.skills.filter(s =>
      s.title.toLowerCase().includes(this.search.toLowerCase()) ||
      s.category.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  deleteSkill(id: string) {
    this.filtered = this.filtered.filter(s => s.id !== id);
  }

  getLevelClass(level: string) {
    if (level === 'Expert') return 'expert';
    if (level === 'Intermédiaire') return 'inter';
    return 'debut';
  }
}