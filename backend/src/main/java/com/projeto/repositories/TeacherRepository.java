package com.projeto.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.projeto.models.Teachers;

@RepositoryRestResource(collectionResourceRel = "teacher", path = "teachers")
public interface TeacherRepository extends JpaRepository<Teachers, Long> {

  public Optional<Teachers> findByUsernameContainingIgnoreCase(String username);

  public Optional<Teachers> findById(Long code);
}