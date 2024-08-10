package com.projeto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import com.projeto.models.Teachers;
import com.projeto.models.Workshop;
import com.projeto.repositories.TeacherRepository;

@Service
public class TeacherService {

  @Autowired
  private TeacherRepository teacherRepository;

  public Teachers create(Teachers teacher) {
    return teacherRepository.save(teacher);
  }

  public Teachers update(Long id, Teachers workshop) {

    Teachers existingTeacher = teacherRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Teacher not found"));

    existingTeacher.setUsername(workshop.getUsername());
    existingTeacher.setEmail(workshop.getEmail());
    existingTeacher.setArea(workshop.getArea());

    return teacherRepository.save(existingTeacher);
  }

  public void delete(Long id) {
    teacherRepository.deleteById(id);
  }

  public List<Teachers> getAll() {
    return teacherRepository.findAll();
  }
}
