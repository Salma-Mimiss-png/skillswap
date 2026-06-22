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

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalSkills", skillRepository.count());
        stats.put("totalSessions", sessionRepository.count());
        return stats;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User banUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(true);
        return userRepository.save(user);
    }

    public User unbanUser(String userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(false);
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
