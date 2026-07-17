package com.skillswap.backend.notifications;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
  @Id
  private String id;
  private String userId;
  private String type;
  private String title;
  private String body;
  private boolean read = false;
  private String sessionId;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getUserId() { return userId; }
  public void setUserId(String userId) { this.userId = userId; }
  public String getType() { return type; }
  public void setType(String type) { this.type = type; }
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getBody() { return body; }
  public void setBody(String body) { this.body = body; }
  public boolean isRead() { return read; }
  public void setRead(boolean read) { this.read = read; }
  public String getSessionId() { return sessionId; }
  public void setSessionId(String sessionId) { this.sessionId = sessionId; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
