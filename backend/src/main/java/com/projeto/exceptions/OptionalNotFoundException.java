package com.projeto.exceptions;

import org.springframework.http.HttpStatus;

public class OptionalNotFoundException extends RuntimeException {
  public OptionalNotFoundException(HttpStatus status, String message) {
    super(message);
  }
}
