package com.projeto.config;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import org.springframework.stereotype.Service;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.projeto.dtos.TokenResponse;
import com.projeto.models.User;

@Service
public class TokenService {

	private String secret = "secret";

	public TokenResponse generateToken(User user) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);
			Instant expirationInstant = getExpirationDate();

			String token = JWT.create()
					.withIssuer("proxy-api")
					.withSubject(user.getEmail())
					.withExpiresAt(Date.from(expirationInstant))
					.sign(algorithm);
			return new TokenResponse(token, expirationInstant.toEpochMilli());

		} catch (JWTCreationException exception) {
			throw new RuntimeException("ERROR WHILE GENERATING TOKEN", exception);
		}
	}

	public String validateToken(String token) {
		try {
			Algorithm algorithm = Algorithm.HMAC256(secret);

			return JWT.require(algorithm)
					.withIssuer("proxy-api")
					.build()
					.verify(token)
					.getSubject();
		}

		catch (JWTVerificationException exception) {
			return "";
		}
	}

	private Instant getExpirationDate() {
		return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
		// return LocalDateTime.now().plusSeconds(20).toInstant(ZoneOffset.of("-03:00"));
	}
}