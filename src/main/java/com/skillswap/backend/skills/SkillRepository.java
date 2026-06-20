package com.skillswap.backend.skills;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository extends MongoRepository<Skill, String> {

    List<Skill> findByCategory(String category);
    List<Skill> findByUserId(String userId);
    List<Skill> findByTitleContainingIgnoreCase(String title);
    List<Skill> findByLevel(String level);
}