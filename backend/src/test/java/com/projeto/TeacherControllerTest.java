package com.projeto;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import com.projeto.dtos.LoginResponseDto;
import com.projeto.dtos.RegisterDto;
import com.projeto.dtos.WorkshopDto;
import com.projeto.models.Teachers;
import com.projeto.models.Workshop;

import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import java.util.Random;
import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Teste usando conexão real com o banco de dados, portante, certifique-se de
 * estar conectado.
 */
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class TeacherControllerTest {

  @LocalServerPort
  private int port;

  @Autowired
  Jackson2ObjectMapperBuilder mapperBuilder;

  @Autowired
  private TestRestTemplate restTemplate;

  static String mainEmail = UUID.randomUUID().toString().substring(0, 6) + "@email.com";
  static String mainNome = UUID.randomUUID().toString().substring(0, 6);
  static String mainSenha = UUID.randomUUID().toString().substring(0, 10);
  static String token = "";
  static Random random = new Random();
  static Long id;

  @Test
  @Order(1)
  public void deveRetornarUmRegisterBemSucedido() throws Exception {

    // Crie um objeto e converte para JSON
    RegisterDto authetinticationDto = new RegisterDto(mainEmail, mainNome, mainSenha);
    String authetinticationDtoJson = new ObjectMapper().writeValueAsString(authetinticationDto);

    // Envie a solicitação POST para o endpoint /register e verifique a resposta
    ResponseEntity<LoginResponseDto> response = restTemplate.postForEntity(
        "http://localhost:" + port + "/auth/register",
        new HttpEntity<>(authetinticationDtoJson, createJsonHeaders()),
        LoginResponseDto.class);

    token = response.getBody().tokenResponse().token();
  }

  @Test
  @Order(2)
  void deveRetornarUmCadastroBemSucedido() throws Exception {

    // Crie um objeto e converte para JSON

    Teachers authetinticationDto = new Teachers("TeacherTeste Antes", "teste@teste", "Comp");
    ObjectMapper mapper = mapperBuilder.build();
    String authetinticationDtoJson = mapper.writeValueAsString(authetinticationDto);

    // Envie a solicitação POST para o endpoint /register e verifique a resposta
    ResponseEntity<Teachers> response = restTemplate.postForEntity(
        "http://localhost:" + port + "/teacher/create",
        new HttpEntity<>(authetinticationDtoJson, createJsonHeadersWithToken(token)),
        Teachers.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());
    id = response.getBody().getId();

  }

  @Test
  @Order(3)
  void deveAlterarUmCadastroExistente() throws Exception {

    // Crie um objeto e converte para JSON
    Teachers authetinticationDto = new Teachers("TeacherTeste Depois", "teste@teste", "Comp");
    ObjectMapper mapper = mapperBuilder.build();
    String authetinticationDtoJson = mapper.writeValueAsString(authetinticationDto);

    // Envie a solicitação POST para o endpoint /register e verifique a resposta
    ResponseEntity<Teachers> response = restTemplate.exchange(
        "http://localhost:" + port + "/teacher/update/" + id, HttpMethod.PUT,
        new HttpEntity<>(authetinticationDtoJson, createJsonHeadersWithToken(token)),
        Teachers.class);

    assertEquals(HttpStatus.OK, response.getStatusCode());

  }

  @Test
  @Order(4)
  void testeSemTokenDeveRetornarUmCadastroMalSucedido() throws Exception {

    // Crie um objeto e converte para JSON
    Teachers authetinticationDto = new Teachers();
    String authetinticationDtoJson = new ObjectMapper().writeValueAsString(authetinticationDto);

    // Envie a solicitação POST para o endpoint /register e verifique a resposta
    ResponseEntity<String> response = restTemplate.postForEntity(
        "http://localhost:" + port + "/teacher/create",
        new HttpEntity<>(authetinticationDtoJson, createJsonHeaders()),
        String.class);

    assertEquals(HttpStatus.FORBIDDEN, response.getStatusCode());
  }

  @Test
  @Order(4)
  void valorNuloDeveRetornarUmCadastroMalSucedido() throws Exception {

    // Crie um objeto e converte para JSON
    Teachers authetinticationDto = new Teachers();
    String authetinticationDtoJson = new ObjectMapper().writeValueAsString(authetinticationDto);

    // Envie a solicitação POST para o endpoint /register e verifique a resposta
    ResponseEntity<String> response = restTemplate.postForEntity(
        "http://localhost:" + port + "/teacher/create",
        new HttpEntity<>(authetinticationDtoJson, createJsonHeadersWithToken(token)),
        String.class);

    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
  }

  static private HttpHeaders createJsonHeaders() {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    return headers;
  }

  static private HttpHeaders createJsonHeadersWithToken(String token) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.set("Authorization", "Bearer " + token);
    return headers;
  }

}