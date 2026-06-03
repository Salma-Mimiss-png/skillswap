package com.skillswap.backend.sessions;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "sessions")
public class Session {

  @Id
  private String id;
  private String teacherId;
  private String teacherName;
  private String studentId;
  private String studentName;
  private String skillId;
  private String skillTitle;
  private String date;
  private String time;
  private String status;
  private String message;
  private LocalDateTime createdAt = LocalDateTime.now();

  public String getId() { return id; }
  public void setId(String id) { this.id = id; }
  public String getTeacherId() { return teacherId; }
  public void setTeacherId(String teacherId) { this.teacherId = teacherId; }
  public String getTeacherName() { return teacherName; }
  public void setTeacherName(String teacherName) { this.teacherName = teacherName; }
  public String getStudentId() { return studentId; }
  public void setStudentId(String studentId) { this.studentId = studentId; }
  public String getStudentName() { return studentName; }
  public void setStudentName(String studentName) { this.studentName = studentName; }
  public String getSkillId() { return skillId; }
  public void setSkillId(String skillId) { this.skillId = skillId; }
  public String getSkillTitle() { return skillTitle; }
  public void setSkillTitle(String skillTitle) { this.skillTitle = skillTitle; }
  public String getDate() { return date; }
  public void setDate(String date) { this.date = date; }
  public String getTime() { return time; }
  public void setTime(String time) { this.time = time; }
  public String getStatus() { return status; }
  public void setStatus(String status) { this.status = status; }
  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
