package co.com.wwb.game.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.com.wwb.game.component.MD5HashingComponent;
import co.com.wwb.game.db.Grupo;
import co.com.wwb.game.db.Nivel;
import co.com.wwb.game.db.Usuario;
import co.com.wwb.game.model.NivelUsuario;
import co.com.wwb.game.model.Registro;
import co.com.wwb.game.model.UserData;
import co.com.wwb.game.model.WWBGameUsuario;
import co.com.wwb.game.repository.NivelRespository;
import co.com.wwb.game.repository.UsuarioRespository;

@Service
public final class WWBGameService {
	
	@Autowired
	private UsuarioRespository repository;
	
	@Autowired
	private NivelRespository nivelRepository;
	
	@Autowired
	private MD5HashingComponent md5HashingComponent;
	
	/**
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	
	public UserData login(String userName, String password) throws Exception{
		
		
		if(userName == null || userName.isEmpty()) {
			throw new Exception("Por favor suministre los datos de inicio de sesión");
		}
		
		if(password == null || password.isEmpty()) {
			throw new Exception("Por favor suministre los datos de inicio de sesión");
		}
		
		Usuario usuario = getUserInformation(userName);
		if(usuario == null) {
			throw new Exception("Las Credenciales de autenticación son incorrectas");
		}
		
		String encriptedPsw = md5HashingComponent.encript(password);
		if(usuario.getPassword().compareTo( encriptedPsw ) != 0) {
			throw new Exception("Las Credenciales de autenticación son incorrectas");
		}
		
		UserData userData = new UserData();
		
		try {
		
			NivelUsuario nivelUsuario = null;
			Optional<Nivel> optional = nivelRepository.findById( userName );
			
			if( optional.isPresent() ) {
				Nivel nivel = optional.get();
				nivelUsuario  = new NivelUsuario();
				nivelUsuario.setNivel( Integer.parseInt(nivel.getNivel())  );
				nivelUsuario.setUserName( nivel.getUsername() );
				userData.setNivel( nivelUsuario );
			}
			
			List<WWBGameUsuario> lstGrupo = usuario.getLstGrupo().stream()
																 .map( p -> new WWBGameUsuario(p.getMembername(), 
																		 					   p.getMemberid()))
																 .collect(Collectors.toList());
				
			userData.setUsers( lstGrupo );
			userData.setUserName( userName );
			userData.setTeamName( usuario.getTeamname() );
		}catch(Exception e) {
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		}
		
		return userData;
	}
	
	
	/**
	 * 
	 * @param registro
	 * @return
	 */
	public String register(Registro registro) throws Exception{
		
		if(registro == null) {
			throw new Exception("La información de registro es requerida");
		}
		
		if(registro.getUsername() == null || registro.getPassword() == null || registro.getTeamName() == null) {
			throw new Exception("La información de registro es requerida");
		}
		
		if(registro.getUsername().isEmpty() || registro.getPassword().isEmpty() || registro.getTeamName().isEmpty()) {
			throw new Exception("La información de registro es requerida");
		}
		
		if(registro.getUsers() == null || registro.getUsers().isEmpty()) {
			throw new Exception("La información de registro es requerida");
		}
		
		
		try {
			
			Usuario tmp =  getUserInformation(registro.getUsername());
			
			if(tmp != null) {
				throw new Exception("EL nombre de usuario ingresado no esta disponible");
			}
			
			Usuario usuario = new Usuario();
			usuario.setUsername(registro.getUsername());
			
			String encriptedPsw = md5HashingComponent.encript(registro.getPassword());
			
			usuario.setTeamname(registro.getTeamName());
			usuario.setPassword( encriptedPsw );
			
			List<Grupo> lstGrupo = registro.getUsers().stream()
					 								  .map( p -> new Grupo(p.getDocumentId(), 
					 										  			   p.getName(),
					 										  			   usuario))
					 								  .collect(Collectors.toList());
			
			
			usuario.setLstGrupo(lstGrupo);
			repository.save(usuario);
			
			Nivel nivel = new Nivel();
			nivel.setNivel("1");
			nivel.setUsername(registro.getUsername());
			nivelRepository.save( nivel );
		}catch(IllegalStateException e) {
			e.printStackTrace();
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		
		}catch(Exception iex) {
			throw new Exception("La información sumistrada en el registro es invalida por favor validar los datos del Grupo que intenta de registrar.");
		}
		
		return "Registro Ejecutado Exitosamente";
	}
	
	/**
	 * 
	 * @param nivelUsuario
	 */
	public void saveProgress(NivelUsuario nivelUsuario) throws Exception{
		
		if(nivelUsuario.getUserName() == null || nivelUsuario.getUserName().isEmpty()) {
			throw new Exception("El identificante del usuario es requerido");
		}
		
		if(nivelUsuario.getUserName() == null || nivelUsuario.getUserName().isEmpty()) {
			throw new Exception("El nivel es requerido");
		}
		
		
		Usuario usuario = this.getUserInformation( nivelUsuario.getUserName() );
		
		if(usuario == null) {
			throw new Exception("Información del usuario incorrecta");
		}
		
		if( usuario.getUsername().compareTo( nivelUsuario.getUserName() ) != 0) {
			throw new Exception("El usuario que esta intentando actualizar el progreso no exite.");
		}
		
		try {
			Nivel nivel = new Nivel();
			nivel.setUsername(nivelUsuario.getUserName());
			nivel.setNivel(nivelUsuario.getNivel().toString());
			
			nivelRepository.save(nivel);
		}catch(Exception e) {
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		}
			
		
	}
	
	private Usuario getUserInformation(String userName) throws Exception {
		
		Usuario usuario = null; 
		Optional<Usuario> optional = repository.findById( userName );
		if(optional.isPresent()) {
			usuario = (Usuario)optional.get();
		}
		return usuario;
	}
}
