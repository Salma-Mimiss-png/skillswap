package com.skillswap.backend.sessions;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessionRepository extends MongoRepository<Session, String> {
  List<Session> findByTeacherId(String teacherId);
  List<Session> findByStudentId(String studentId);
  List<Session> findByStatus(String status);
}
