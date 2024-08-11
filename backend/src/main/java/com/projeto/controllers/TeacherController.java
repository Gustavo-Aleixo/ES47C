package com.projeto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.models.Teachers;
import com.projeto.services.TeacherService;

@RestController
@RequestMapping("teacher")
public class TeacherController {

  @Autowired
  private TeacherService teacherService;

  /**
   * {
   * "username": "Teacher de Spring Boot",
   * "email": "2024-04-14",
   * "area" : "Computação"
   * }
   */
  @PostMapping("/create")
  public ResponseEntity<Teachers> register(@RequestBody Teachers teacher) {
    Teachers createdTeacher = teacherService.create(teacher);
    return ResponseEntity.ok(createdTeacher);
  }

  /**
   * {
   * "username": "Teacher de Spring Boot",
   * "email": "2024-04-14",
   * "area" : "Computação"
   * }
   */
  @PutMapping("/update/{id}")
  public ResponseEntity<Teachers> update(@PathVariable Long id, @RequestBody Teachers teacher) {
    Teachers updatedTeacher = teacherService.update(id, teacher);
    return ResponseEntity.ok(updatedTeacher);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    teacherService.delete(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAll() {
    List<Teachers> response = teacherService.getAll();
    return ResponseEntity.ok(response);
  }

}
