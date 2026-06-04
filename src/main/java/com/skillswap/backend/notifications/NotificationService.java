package com.skillswap.backend.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {

  @Autowired
  private NotificationRepository notificationRepository;

  public Notification create(String userId, String type, String title, String body, String sessionId) {
    Notification n = new Notification();
    n.setUserId(userId);
    n.setType(type);
    n.setTitle(title);
    n.setBody(body);
    n.setSessionId(sessionId);
    return notificationRepository.save(n);
  }

  public List<Notification> getByUser(String userId) {
    return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
  }

  public Notification markAsRead(String id) {
    Notification n = notificationRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Notification not found"));
    n.setRead(true);
    return notificationRepository.save(n);
  }
}
