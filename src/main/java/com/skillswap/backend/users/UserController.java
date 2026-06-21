package com.skillswap.backend.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping("/{id}")
  public ResponseEntity<User> recupererUser(@PathVariable String id) {
    User user = userService.recupererUserParId(id);
    if (user == null) return ResponseEntity.status(401).build();
    return ResponseEntity.ok(user);
  }

  @PostMapping("/auth")
  public ResponseEntity<User> authentifierUser(@RequestBody AppUserDto user) {
    User userConnecte = userService.authentifierAppUser(user);
    if (userConnecte == null) return ResponseEntity.status(404).build();
    return ResponseEntity.ok(userConnecte);
  }

  @PostMapping("/inscrire")
  public ResponseEntity<User> registerUser(@RequestBody User user) {
    User registredUser = userService.registerAppUser(user);
    if (registredUser == null) return ResponseEntity.status(401).build();
    return ResponseEntity.ok(registredUser);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<User> modifierUser(@RequestBody User userModifie, @PathVariable String id) {
    User editedUser = userService.modifierAppUser(userModifie, id);
    if (editedUser == null) return ResponseEntity.status(401).build();
    return ResponseEntity.ok(editedUser);
  }
}
