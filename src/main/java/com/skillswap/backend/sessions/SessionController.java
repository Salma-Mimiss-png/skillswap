package com.skillswap.backend.sessions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {

  @Autowired
  private SessionService sessionService;

  @PostMapping
  public ResponseEntity<Session> createSession(@RequestBody Session session) {
    return ResponseEntity.ok(sessionService.createSession(session));
  }

  @PutMapping("/{id}/accept")
  public ResponseEntity<Session> accept(@PathVariable String id) {
    return ResponseEntity.ok(sessionService.acceptSession(id));
  }

  @PutMapping("/{id}/reject")
  public ResponseEntity<Session> reject(@PathVariable String id) {
    return ResponseEntity.ok(sessionService.rejectSession(id));
  }

  @PutMapping("/{id}/complete")
  public ResponseEntity<Session> complete(@PathVariable String id) {
    return ResponseEntity.ok(sessionService.completeSession(id));
  }

  @GetMapping("/my/{userId}")
  public ResponseEntity<List<Session>> getMySessions(@PathVariable String userId) {
    return ResponseEntity.ok(sessionService.getMySessions(userId));
  }
  @PutMapping("/{id}/rate")
  public ResponseEntity<Session> markRated(@PathVariable String id, @RequestParam int stars) {
    return ResponseEntity.ok(sessionService.markAsRated(id, stars));
  }
}
