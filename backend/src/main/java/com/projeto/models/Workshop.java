package com.projeto.models;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "WORKSHOPS")
public class Workshop extends BaseEntity {

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime dateTime;

	@ManyToOne(optional = false)
	@JoinColumn(name = "responsible_teacher_id", nullable = false)
	private Teachers responsibleTeacher;

	@Column(nullable = false)
	private int maxStudents;

}
