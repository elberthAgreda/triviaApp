package co.com.wwb.game.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.com.wwb.game.component.MD5HashingComponent;
import co.com.wwb.game.db.Agencia;
import co.com.wwb.game.db.Ciudad;
import co.com.wwb.game.db.Grupo;
import co.com.wwb.game.db.Nivel;
import co.com.wwb.game.db.Usuario;
import co.com.wwb.game.db.Voto;
import co.com.wwb.game.model.Elemento;
import co.com.wwb.game.model.NivelUsuario;
import co.com.wwb.game.model.Puntuacion;
import co.com.wwb.game.model.Registro;
import co.com.wwb.game.model.Resultado;
import co.com.wwb.game.model.UserData;
import co.com.wwb.game.model.WWBGameUsuario;
import co.com.wwb.game.repository.AgenciaRepository;
import co.com.wwb.game.repository.CiudadRepository;
import co.com.wwb.game.repository.NivelRespository;
import co.com.wwb.game.repository.UsuarioRespository;
import co.com.wwb.game.repository.VotoQueryRepository;
import co.com.wwb.game.repository.VotoRepository;

@Service
public final class WWBGameService {
	
	private static final SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");
	
	@Autowired
	private UsuarioRespository repository;
	
	@Autowired
	private NivelRespository nivelRepository;
	
	@Autowired
	private VotoRepository votoRepository;

	@Autowired
	private CiudadRepository ciudadRepository;

	@Autowired
	private AgenciaRepository agenciaRepository;

	@Autowired
	private VotoQueryRepository votoQueryRepository;

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
			throw new Exception("EL grupo de usuarios es requerida");
		}
		
		if(registro.getCiudad() == null || registro.getCiudad().isEmpty()) {
			throw new Exception("La ciudad es requerida");
		}
		
		if(registro.getAgencia() == null || registro.getAgencia().isEmpty()) {
			throw new Exception("La Agencia es requerida");
		}

		String error = null;
		try {
			
			Usuario tmp =  getUserInformation(registro.getUsername());
			
			if(tmp != null) {
				error = "EL nombre de usuario ingresado no esta disponible";
				throw new Exception(error);
			}
			
			Usuario usuario = new Usuario();
			usuario.setUsername(registro.getUsername());
			
			String encriptedPsw = md5HashingComponent.encript(registro.getPassword());
			
			usuario.setTeamname(registro.getTeamName());
			usuario.setPassword( encriptedPsw );
			usuario.setCiudad( registro.getCiudad() );
			usuario.setAgencia( registro.getAgencia() );
			
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
			if ( error == null) {
				iex.printStackTrace();
				error = "La información sumistrada en el registro es invalida por favor validar los datos del Grupo que intenta de registrar.";
			}
			throw new Exception(error);
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
			e.printStackTrace();
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		}
	}

	/**
	 * 
	 * @param nivelUsuario
	 */
	public void saveVoto(Puntuacion puntuacionUsuario) throws Exception{
		
		String error = null;
		
		if(puntuacionUsuario.getVideo() == null || puntuacionUsuario.getVideo().isEmpty()) {
			error = "El identificante del video es requerido";
			throw new Exception( error );
		}
		
		if(puntuacionUsuario.getUsuario() == null || puntuacionUsuario.getUsuario().isEmpty()) {
			error = "El id de usuario es requerido";
			throw new Exception( error );
		}
		
		if(puntuacionUsuario.getAgencia() == null || puntuacionUsuario.getAgencia().isEmpty()) {
			error = "La agencia es requerida";
			throw new Exception( error );
		}
		
		Usuario usuario = this.getUserInformation( puntuacionUsuario.getUsuario() );
		
		if(usuario == null) {
			error = "Usuario no registrado";
			throw new Exception( error );
		}
		
		String agenciaSrv = puntuacionUsuario.getAgencia();
		
		//valido que el usuario no pueda votar por la misma agencia
		if ( usuario.getAgencia() != null ) {
			if ( !usuario.getAgencia().equals(agenciaSrv) ) {
				error = "No se puede registrar un voto para la misma agencia";
				throw new Exception( error );
			}	
		}
		
		long total = this.votoQueryRepository.votosByUser( puntuacionUsuario.getUsuario() );
		if ( total > 1 && (total > usuario.getLstGrupo().size() )) {
			error = "EL usuario no puede registrar más votos";
			throw new Exception( error );	
		}
		
		try {
			Voto voto = new Voto();
			voto.setUsuario( puntuacionUsuario.getUsuario() );
			voto.setVideo( puntuacionUsuario.getVideo() );	
			voto.setId( UUID.randomUUID().toString() );
			voto.setAgencia( puntuacionUsuario.getAgencia() );
			
			if ( puntuacionUsuario.getFecha() == null || puntuacionUsuario.getFecha().isEmpty() ) {
				voto.setFecha( new Date() );
			}else {
				voto.setFecha( formatoFecha.parse( puntuacionUsuario.getFecha().trim() ) );
			}
			
			votoRepository.save(voto);
		}catch(Exception e) {
			if ( error == null) {
				e.printStackTrace();
				error = "Se ha presentado un error en el sistema por favor contactese con el administrador.";
			}
			throw new Exception( error );
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

	/**
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	
	public Resultado obtenerListado( UserData user , boolean ciudades) throws Exception{
		
		Resultado resultado = new Resultado();
		resultado.setListado( new ArrayList<Elemento>());
		
		try{
		
			if ( ciudades ) {
				resultado.setTipo("CIUDADES");
				//consulto los registros de ciudades
				Iterable<Ciudad> all = ciudadRepository.findAll();
				for (Ciudad ciudad : all) {
					resultado.getListado().add( new Elemento( ciudad.getCodigo() , ciudad.getNombre() ,
																ciudad.getCodigo()) );
				}
			}else {
				resultado.setTipo("AGENCIAS");
				
				//consulto los registros de ciudades
				Iterable<Agencia> all = agenciaRepository.findAll();
				if ( user == null || user.getCiudad() == null || user.getCiudad().length() < 1) {
					for (Agencia agencia : all) {
						resultado.getListado().add( new Elemento( agencia.getCodigo() , agencia.getNombre(), 
																  agencia.getCiudad() ) );
					}
				}else {
					//filtro por la ciudad
					for (Agencia agencia : all) {
						if ( user.getCiudad().equals( agencia.getCiudad() )){
							resultado.getListado().add( new Elemento( agencia.getCodigo() , agencia.getNombre(), 
																  agencia.getCiudad() ) );
						}
					}
				}
			}

		}catch(Exception e) {
			e.printStackTrace();
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		}
		
		return resultado;
	}

	/**
	 * 
	 * @param username
	 * @param password
	 * @return
	 */
	
	public Resultado obtenerPuntuacion( UserData user ) throws Exception{
		
		Resultado resultado = new Resultado();
		resultado.setListado( new ArrayList<Elemento>());
		
		try{
		
			resultado.setTipo("VOTOS");
			//consulto los registros para luego ir acumulando los votos
			Iterable<Voto> all = votoRepository.findAll();
			
			//llave id del video y valor cantidad de veces votado
			HashMap<String, Integer> acumulado = new HashMap<String, Integer>();
			//llave id del video y valor la agencia al cual pertenece
			HashMap<String, String> laAgencia = new HashMap<String, String>();
			
			for (Voto voto : all) {
				if ( acumulado.containsKey(voto.getVideo()) ) {
					int actual = acumulado.get(voto.getVideo());
					acumulado.replace( voto.getVideo() , ++actual );
				}else {
					acumulado.put( voto.getVideo() , 1);
					laAgencia.put( voto.getVideo(), voto.getAgencia() );
				}
			}
			
			for (String id : acumulado.keySet()) {
				resultado.getListado().add( new Elemento( id , String.valueOf( acumulado.get(id) ), null, laAgencia.get(id) , String.valueOf( acumulado.get(id) ) ) );
			}

			laAgencia.clear();
			acumulado.clear();

		}catch(Exception e) {
			e.printStackTrace();
			throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
		}

		return resultado;
	}
}
