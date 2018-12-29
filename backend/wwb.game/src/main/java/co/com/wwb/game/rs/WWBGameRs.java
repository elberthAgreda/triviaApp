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
import co.com.wwb.game.model.Puntuacion;
import co.com.wwb.game.model.Registro;
import co.com.wwb.game.model.Resultado;
import co.com.wwb.game.model.UserData;
import co.com.wwb.game.service.WWBGameService;

@RestController
@RequestMapping("/rest/wwbgame/api")
public class WWBGameRs {

	@Autowired
	private WWBGameService service;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, 
									  consumes = MediaType.APPLICATION_JSON_VALUE,
									  produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserData> login( @RequestBody  UserData user) throws Exception {
		UserData userData = service.login(user.getUserName(), user.getPassword());
		return ResponseEntity.ok().body(userData);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.PUT, 
										 consumes = MediaType.APPLICATION_JSON_VALUE, 
										 produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody Registro registro ) throws Exception{
		String message = service.register(registro);
		return ResponseEntity.ok().body(message);
	}
	
	@RequestMapping(value = "/saveProgress", method = RequestMethod.PUT, 
											 consumes = MediaType.APPLICATION_JSON_VALUE,
											 produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> saveProgress(@RequestBody NivelUsuario nivelUsuario ) throws Exception{
		service.saveProgress(nivelUsuario);
		return ResponseEntity.ok().body("Progreso almacenado exitosamente");
	}

	@RequestMapping(value = "/saveVote", method = RequestMethod.PUT, 
			 consumes = MediaType.APPLICATION_JSON_VALUE,
			 produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> saveVote(@RequestBody Puntuacion puntuacionUsuario) throws Exception{
		service.saveVoto(puntuacionUsuario);
		return ResponseEntity.ok().body("Voto almacenado exitosamente");
	}

	@RequestMapping(value = "/cities", method = RequestMethod.POST, 
			  consumes = MediaType.APPLICATION_JSON_VALUE,
			  produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Resultado> getCiudades( @RequestBody  UserData user) throws Exception {
		Resultado resultado = service.obtenerListado(user , true );
			return ResponseEntity.ok().body(resultado);
	}

	@RequestMapping(value = "/agencies", method = RequestMethod.POST, 
			  consumes = MediaType.APPLICATION_JSON_VALUE,
			  produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Resultado> getAgencias( @RequestBody  UserData user) throws Exception {
		Resultado resultado = service.obtenerListado(user , false );
			return ResponseEntity.ok().body(resultado);
	}
	
	@RequestMapping(value = "/scores", method = RequestMethod.POST, 
			  consumes = MediaType.APPLICATION_JSON_VALUE,
			  produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Resultado> getScores( @RequestBody  UserData user) throws Exception {
		Resultado resultado = service.obtenerPuntuacion(user);
			return ResponseEntity.ok().body(resultado);
	}
}
