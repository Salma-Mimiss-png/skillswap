package com.skillswap.backend;

import com.skillswap.backend.skills.Skill;
import com.skillswap.backend.skills.SkillRepository;
import com.skillswap.backend.users.User;
import com.skillswap.backend.users.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class BackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }
}
