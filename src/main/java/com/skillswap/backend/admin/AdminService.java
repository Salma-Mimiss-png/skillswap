package com.skillswap.backend.admin;

import com.skillswap.backend.users.User;
import com.skillswap.backend.users.UserRepository;
import com.skillswap.backend.skills.SkillRepository;
import com.skillswap.backend.sessions.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private SessionRepository sessionRepository;

    // Statistiques globales
    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalSkills", skillRepository.count());
        stats.put("totalSessions", sessionRepository.count());
        stats.put("pendingSessions", (long) sessionRepository.findByStatus("PENDING").size());
        stats.put("completedSessions", (long) sessionRepository.findByStatus("COMPLETED").size());
        return stats;
    }

    // Voir tous les utilisateurs
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Bannir un utilisateur
    public User banUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(true);
        return userRepository.save(user);
    }

    // Débannir un utilisateur
    public User unbanUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(false);
        return userRepository.save(user);
    }

    // Supprimer un utilisateur
    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
