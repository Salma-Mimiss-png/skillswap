package com.skillswap.backend.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Notification>> getNotifs(@PathVariable String userId) {
    return ResponseEntity.ok(notificationService.getByUser(userId));
  }

  @PutMapping("/{id}/read")
  public ResponseEntity<Notification> markRead(@PathVariable String id) {
    return ResponseEntity.ok(notificationService.markAsRead(id));
  }
}
