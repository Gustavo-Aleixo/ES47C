package com.projeto.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkshopDto {

	@NotBlank
	private String title;

	@NotBlank
	private long responsibleTeacherId;

	@NotBlank
	private String dateTime;

	@NotNull
	private int maxStudents;
}
