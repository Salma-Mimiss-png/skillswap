package com.skillswap.backend.admin;

import com.skillswap.backend.users.User;
import com.skillswap.backend.skills.Skill;
import com.skillswap.backend.sessions.Session;
import com.skillswap.backend.skills.SkillRepository;
import com.skillswap.backend.sessions.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Admin", description = "Endpoints d'administration SkillSwap")
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Operation(summary = "Statistiques globales", description = "Retourne le nombre total d'utilisateurs, compétences et sessions")
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @Operation(summary = "Liste tous les utilisateurs", description = "Retourne la liste complète des utilisateurs")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @Operation(summary = "Bannir un utilisateur", description = "Bloque l'accès d'un utilisateur à la plateforme")
    @PutMapping("/users/{id}/ban")
    public ResponseEntity<User> banUser(@PathVariable String id) {
        return ResponseEntity.ok(adminService.banUser(id));
    }

    @Operation(summary = "Débannir un utilisateur", description = "Rétablit l'accès d'un utilisateur banni")
    @PutMapping("/users/{id}/unban")
    public ResponseEntity<User> unbanUser(@PathVariable String id) {
        return ResponseEntity.ok(adminService.unbanUser(id));
    }

    @Operation(summary = "Supprimer un utilisateur", description = "Supprime définitivement un utilisateur")
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Liste toutes les compétences", description = "Retourne toutes les compétences publiées")
    @GetMapping("/skills")
    public ResponseEntity<List<Skill>> getAllSkills() {
        return ResponseEntity.ok(skillRepository.findAll());
    }

    @Operation(summary = "Supprimer une compétence", description = "Supprime définitivement une compétence")
    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String id) {
        skillRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Liste toutes les sessions", description = "Retourne toutes les sessions d'échange")
    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getAllSessions() {
        return ResponseEntity.ok(sessionRepository.findAll());
    }
}
