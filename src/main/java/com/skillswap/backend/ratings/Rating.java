package com.skillswap.backend.ratings;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "ratings")
public class Rating {

  @Id
  private String id;
  private String sessionId;
  private String userId;
  private int stars;
  private String comment;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }

  public String getSessionId() { return sessionId; }
  public void setSessionId(String sessionId) { this.sessionId = sessionId; }

  public String getUserId() { return userId; }
  public void setUserId(String userId) { this.userId = userId; }

  public int getStars() { return stars; }
  public void setStars(int stars) { this.stars = stars; }

  public String getComment() { return comment; }
  public void setComment(String comment) { this.comment = comment; }

  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
