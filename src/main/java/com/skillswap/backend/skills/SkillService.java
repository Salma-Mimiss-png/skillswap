package com.skillswap.backend.skills;

import com.skillswap.backend.skills.Skill;
import com.skillswap.backend.skills.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

  @Autowired
  private SkillRepository skillRepository;

  // Récupérer toutes les compétences
  public List<Skill> getAllSkills() {
    return skillRepository.findAll();
  }

  // Récupérer une compétence par ID
  public Optional<Skill> getSkillById(String id) {
    return skillRepository.findById(id);
  }

  // Chercher par titre
  public List<Skill> searchByTitle(String title) {
    return skillRepository.findByTitleContainingIgnoreCase(title);
  }

  // Récupérer les compétences d'un utilisateur
  public List<Skill> getSkillsByUser(String userId) {
    return skillRepository.findByUserId(userId);
  }

  // Récupérer par catégorie
  public List<Skill> getSkillsByCategory(String category) {
    return skillRepository.findByCategory(category);
  }

  // Ajouter une compétence
  public Skill createSkill(Skill skill) {
    return skillRepository.save(skill);
  }

  // Modifier une compétence
  public Skill updateSkill(String id, Skill newSkill) {
    Skill skill = skillRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Skill non trouvé"));

    skill.setTitle(newSkill.getTitle());
    skill.setDescription(newSkill.getDescription());
    skill.setCategory(newSkill.getCategory());
    skill.setLevel(newSkill.getLevel());

    return skillRepository.save(skill);
  }

  // Supprimer une compétence
  public void deleteSkill(String id) {
    skillRepository.deleteById(id);
  }
}
