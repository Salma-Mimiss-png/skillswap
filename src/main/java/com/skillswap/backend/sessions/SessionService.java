package com.skillswap.backend.sessions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class SessionService {

  @Autowired
  private SessionRepository sessionRepository;

  public Session createSession(Session session) {
    session.setStatus("PENDING");
    return sessionRepository.save(session);
  }

  public Session acceptSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("ACCEPTED");
    return sessionRepository.save(session);
  }

  public Session rejectSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("REJECTED");
    return sessionRepository.save(session);
  }

  public Session completeSession(String id) {
    Session session = sessionRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Session not found"));
    session.setStatus("COMPLETED");
    return sessionRepository.save(session);
  }

  public List<Session> getMySessions(String userId) {
    List<Session> all = new ArrayList<>();
    all.addAll(sessionRepository.findByTeacherId(userId));
    all.addAll(sessionRepository.findByStudentId(userId));
    return all;
  }
}
