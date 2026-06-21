package com.skillswap.backend.skills;

import com.skillswap.backend.skills.Skill;
import com.skillswap.backend.skills.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // GET /api/skills
    @GetMapping
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    // GET /api/skills/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable String id) {
        return skillService.getSkillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/skills/search?title=java
    @GetMapping("/search")
    public List<Skill> searchSkills(@RequestParam String title) {
        return skillService.searchByTitle(title);
    }

    // GET /api/skills/user/{userId}
    @GetMapping("/user/{userId}")
    public List<Skill> getSkillsByUser(@PathVariable String userId) {
        return skillService.getSkillsByUser(userId);
    }

    // GET /api/skills/category/{category}
    @GetMapping("/category/{category}")
    public List<Skill> getSkillsByCategory(@PathVariable String category) {
        return skillService.getSkillsByCategory(category);
    }

    // POST /api/skills
    @PostMapping
    public Skill createSkill(@RequestBody Skill skill) {
        return skillService.createSkill(skill);
    }

    // PUT /api/skills/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable String id, @RequestBody Skill skill) {
        try {
            Skill updated = skillService.updateSkill(id, skill);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/skills/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
}
