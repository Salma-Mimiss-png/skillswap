package com.skillswap.backend.admin;

import com.skillswap.backend.users.User;
import com.skillswap.backend.skills.Skill;
import com.skillswap.backend.skills.SkillRepository;
import com.skillswap.backend.sessions.Session;
import com.skillswap.backend.sessions.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

  @Autowired
  private AdminService adminService;
  @Autowired
  private SkillRepository skillRepository;
  @Autowired
  private SessionRepository sessionRepository;

  // Statistiques globales
  @GetMapping("/stats")
  public ResponseEntity<Map<String, Long>> getStats() {
    return ResponseEntity.ok(adminService.getStats());
  }

  // Tous les utilisateurs
  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(adminService.getAllUsers());
  }

  // Bannir un utilisateur
  @PutMapping("/users/{id}/ban")
  public ResponseEntity<User> banUser(@PathVariable String id) {
    return ResponseEntity.ok(adminService.banUser(id));
  }

  // Débannir un utilisateur
  @PutMapping("/users/{id}/unban")
  public ResponseEntity<User> unbanUser(@PathVariable String id) {
    return ResponseEntity.ok(adminService.unbanUser(id));
  }

  // Supprimer un utilisateur
  @DeleteMapping("/users/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    adminService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

  // Toutes les compétences
  @GetMapping("/skills")
  public ResponseEntity<List<Skill>> getAllSkills() {
    return ResponseEntity.ok(skillRepository.findAll());
  }

  // Supprimer une compétence
  @DeleteMapping("/skills/{id}")
  public ResponseEntity<Void> deleteSkill(@PathVariable String id) {
    skillRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  // Toutes les sessions
  @GetMapping("/sessions")
  public ResponseEntity<List<Session>> getAllSessions() {
    return ResponseEntity.ok(sessionRepository.findAll());
  }
}
