package com.skillswap.backend.ratings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingController {

  @Autowired
  private RatingService ratingService;

  @PostMapping
  public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
    return ResponseEntity.ok(ratingService.createRating(rating));
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Rating>> getByUser(@PathVariable String userId) {
    return ResponseEntity.ok(ratingService.getRatingsByUser(userId));
  }

  @GetMapping("/session/{sessionId}")
  public ResponseEntity<List<Rating>> getBySession(@PathVariable String sessionId) {
    return ResponseEntity.ok(ratingService.getRatingsBySession(sessionId));
  }
}
