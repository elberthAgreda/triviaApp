package co.com.wwb.game.rs;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import co.com.wwb.game.model.NivelUsuario;
import co.com.wwb.game.model.Registro;
import co.com.wwb.game.model.UserData;
import co.com.wwb.game.service.WWBGameService;

@RestController
@RequestMapping("/rest/wwbgame/api")
public class WWBGameRs {

	@Autowired
	private WWBGameService service;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserData> login(@RequestParam(value="username") String username, @RequestParam(value="password") String password ) throws Exception {
		UserData userData = service.login(username, password);
		return ResponseEntity
	            .ok()
	            .body(userData);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.PUT, 
										 consumes = MediaType.APPLICATION_JSON_VALUE, 
										 produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody Registro registro ) throws Exception{
		service.register(registro);
		return ResponseEntity
	            .ok()
	            .body("exito");
		
	}
	
	@RequestMapping(value = "/saveProgress", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> saveProgress(@RequestBody NivelUsuario nivelUsuario ) throws Exception{
		
		service.saveProgress(nivelUsuario);
		
		return ResponseEntity
	            .ok()
	            .body("Progreso almacenado exitosamente");
		
	}
}
