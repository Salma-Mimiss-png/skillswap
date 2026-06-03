package com.skillswap.backend.ratings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RatingService {

  @Autowired
  private RatingRepository ratingRepository;

  public Rating createRating(Rating rating) {
    return ratingRepository.save(rating);
  }

  public List<Rating> getRatingsByUser(String userId) {
    return ratingRepository.findByUserId(userId);
  }

  public List<Rating> getRatingsBySession(String sessionId) {
    return ratingRepository.findBySessionId(sessionId);
  }
}
