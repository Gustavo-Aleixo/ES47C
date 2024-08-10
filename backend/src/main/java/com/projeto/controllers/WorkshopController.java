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
import com.projeto.dtos.WorkshopDto;
import com.projeto.models.Workshop;
import com.projeto.services.WorkshopService;

@RestController
@RequestMapping("workshop")
public class WorkshopController {

	@Autowired
	WorkshopService workshopService;

	/**
	 * {
	 * "title": "Workshop de Spring Boot",
	 * "date": "2024-04-14",
	 * "responsibleTeacherId": 3
	 * "maxStudents": 10
	 * }
	 */
	@PostMapping("/create")
	public ResponseEntity<Workshop> register(@RequestBody WorkshopDto workshop) {
		Workshop createdWorkshop = workshopService.create(workshop);
		return ResponseEntity.ok(createdWorkshop);
	}

	/**
	 * {
	 * "title": "Workshop de Spring Boot",
	 * "date": "2024-04-14",
	 * "responsibleTeacherId": 3
	 * "maxStudents": 10
	 * }
	 */
	@PutMapping("/update/{id}")
	public ResponseEntity<Workshop> update(@PathVariable Long id, @RequestBody WorkshopDto workshop) {
		Workshop updatedWorkshop = workshopService.update(id, workshop);
		return ResponseEntity.ok(updatedWorkshop);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		workshopService.delete(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAll() {
		List<Workshop> response = workshopService.getAll();
		return ResponseEntity.ok(response);
	}
}