package com.example.demo;

import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.models.Usuario;
import com.example.demo.service.UsuarioService;

@RunWith(SpringRunner.class)
@SpringBootTest
class Ud4TareaApplicationTests {
	
	@Autowired
	private UsuarioService usuarioService;

	@Test
	void crearUsuarioTest() {
		Usuario us = new Usuario();
		us.setId(5);
		us.setNombre("jose");
		us.setClave("6824");
		Usuario retorno = usuarioService.guardarUsuario(us);

		assertTrue(new BCryptPasswordEncoder().matches("6824", retorno.getClave()));
	}

}
