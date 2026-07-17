package com.skillswap.backend.sessions;

import com.skillswap.backend.notifications.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionService {

  @Autowired
  private SessionRepository sessionRepository;

  @Autowired
  private NotificationService notificationService;


  public Session createSession(Session session) {
    session.setStatus("PENDING");
    return sessionRepository.save(session);
  }

  public Session acceptSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("ACCEPTED");
    Session saved = sessionRepository.save(session);
    notificationService.create(
      session.getStudentId(),
      "ACCEPTED",
      "Session acceptée !",
      "Ta demande pour \"" + session.getSkillTitle() + "\" a été acceptée",
      id
    );
    return saved;
  }

  public Session rejectSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("REJECTED");
    Session saved = sessionRepository.save(session);
    notificationService.create(
      session.getStudentId(),
      "REJECTED",
      "Session refusée",
      "Ta demande pour \"" + session.getSkillTitle() + "\" a été refusée",
      id
    );
    return saved;
  }

  public Session completeSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("COMPLETED");
    Session saved = sessionRepository.save(session);
    notificationService.create(
      session.getStudentId(),
      "COMPLETED",
      "Session terminée",
      "Ta session \"" + session.getSkillTitle() + "\" est terminée, pense à noter !",
      id
    );
    return saved;
  }

  public List<Session> getMySessions(String userId) {
    List<Session> all = new ArrayList<>();
    all.addAll(sessionRepository.findByTeacherId(userId));
    all.addAll(sessionRepository.findByStudentId(userId));
    return all;
  }
  public Session markAsRated(String id, int stars) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setRated(true);
    session.setStars(stars);
    return sessionRepository.save(session);
  }
}
