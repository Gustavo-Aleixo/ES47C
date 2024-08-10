package com.projeto.services;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.projeto.dtos.WorkshopDto;
import com.projeto.exceptions.OptionalNotFoundException;
import com.projeto.models.Teachers;
import com.projeto.models.Workshop;
import com.projeto.repositories.TeacherRepository;
import com.projeto.repositories.WorkshopRepository;

@Service
public class WorkshopService {

	@Autowired
	private WorkshopRepository workshopRepository;

	@Autowired
	private TeacherRepository teacherRepository;

	public Workshop create(WorkshopDto workshopDto) {

		Teachers teacher = teacherRepository.findById(workshopDto.getResponsibleTeacherId())
				.orElseThrow(() -> new OptionalNotFoundException(HttpStatus.NOT_FOUND, "Workshop not found"));

		LocalDateTime dateTime = LocalDateTime.parse(workshopDto.getDateTime());
		Workshop workshop = new Workshop();
		workshop.setTitle(workshopDto.getTitle());
		workshop.setDateTime(dateTime);
		workshop.setResponsibleTeacher(teacher);
		workshop.setMaxStudents(workshopDto.getMaxStudents());

		return workshopRepository.save(workshop);
	}

	public Workshop update(Long id, WorkshopDto workshopDto) {

		Workshop existingWorkshop = workshopRepository.findById(id)
				.orElseThrow(() -> new OptionalNotFoundException(HttpStatus.NOT_FOUND, "Workshop not found"));

		Teachers teacher = teacherRepository.findById(workshopDto.getResponsibleTeacherId())
				.orElseThrow(() -> new OptionalNotFoundException(HttpStatus.NOT_FOUND, "Workshop not found"));

		LocalDateTime dateTime = LocalDateTime.parse(workshopDto.getDateTime());
		existingWorkshop.setTitle(workshopDto.getTitle());
		existingWorkshop.setDateTime(dateTime);
		existingWorkshop.setResponsibleTeacher(teacher);
		existingWorkshop.setMaxStudents(workshopDto.getMaxStudents());

		return workshopRepository.save(existingWorkshop);
	}

	public void delete(Long id) {
		workshopRepository.deleteById(id);
	}

	public List<Workshop> getAll() {
		return workshopRepository.findAll();
	}

}