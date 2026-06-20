package com.skillswap.backend.repository;

import com.skillswap.backend.model.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SessionRepository extends MongoRepository<Session, String> {
    List<Session> findByTeacherId(String teacherId);
    List<Session> findByStudentId(String studentId);
    List<Session> findByStatus(String status);
}