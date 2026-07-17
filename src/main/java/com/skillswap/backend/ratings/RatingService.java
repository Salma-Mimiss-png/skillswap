package com.skillswap.backend.ratings;

import com.skillswap.backend.sessions.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RatingService {

  @Autowired
  private RatingRepository ratingRepository;

  @Autowired
  private SessionService sessionService;

  public Rating createRating(Rating rating) {
    Rating saved = ratingRepository.save(rating);
    sessionService.markAsRated(rating.getSessionId(), rating.getStars());
    return saved;
  }

  public List<Rating> getRatingsByUser(String userId) {
    return ratingRepository.findByUserId(userId);
  }

  public List<Rating> getRatingsBySession(String sessionId) {
    return ratingRepository.findBySessionId(sessionId);
  }
}
