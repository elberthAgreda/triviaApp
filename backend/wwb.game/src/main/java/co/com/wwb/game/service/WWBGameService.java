package co.com.wwb.game.service;

import co.com.wwb.game.component.MD5HashingComponent;
import co.com.wwb.game.db.*;
import co.com.wwb.game.errors.ErrorCodes;
import co.com.wwb.game.errors.WWBGeneralException;
import co.com.wwb.game.model.*;
import co.com.wwb.game.model.v2.RegistroV2;
import co.com.wwb.game.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public final class WWBGameService {

    private static final SimpleDateFormat formatoFecha = new SimpleDateFormat("dd/MM/yyyy");

    private final UsuarioRespository repository;
    private final GrupoRespository grupoRespository;
    private final NivelRespository nivelRepository;
    private final VotoRepository votoRepository;
    private final CiudadRepository ciudadRepository;
    private final AgenciaRepository agenciaRepository;
    private final VotoQueryRepository votoQueryRepository;
    private final UsuarioHabilitadoRespository usuarioHabilitadoRespository;
    private final MD5HashingComponent md5HashingComponent;


    /**
     *
     * @param userName
     * @param password
     * @return
     * @throws Exception
     */
    public UserData login(String userName, String password) throws Exception {


        if (userName == null || userName.isEmpty()) {
            throw new Exception(ErrorCodes.CREDENCIALES_NO_ENVIADAS.getMessageError());
        }

        if (password == null || password.isEmpty()) {
            throw new Exception(ErrorCodes.CREDENCIALES_NO_ENVIADAS.getMessageError());
        }

        Usuario usuario = getUserInformation(userName);
        if (usuario == null) {
            throw new Exception(ErrorCodes.CREDENCIALES_INVALIDAS.getMessageError());
        }

        String encriptedPsw = md5HashingComponent.encript(password);
        if (usuario.getPassword().compareTo(encriptedPsw) != 0) {
            throw new Exception(ErrorCodes.CREDENCIALES_INVALIDAS.getMessageError());
        }

        UserData userData = new UserData();
        try {

            NivelUsuario nivelUsuario = null;
            Optional<Nivel> optional = nivelRepository.findById(userName);

            if (optional.isPresent()) {
                Nivel nivel = optional.get();
                nivelUsuario = new NivelUsuario();
                nivelUsuario.setNivel(Integer.parseInt(nivel.getNivel()));
                nivelUsuario.setUserName(nivel.getUsername());
                userData.setNivel(nivelUsuario);
            }

            List<WWBGameUsuario> lstGrupo = usuario.getLstGrupo().stream()
                    .map(p -> new WWBGameUsuario(p.getMembername(),
                            p.getMemberid()))
                    .collect(Collectors.toList());

            if (lstGrupo.isEmpty()) {
                throw new Exception("El usuario no tiene participantes asociados");
            }

            userData.setUsers(lstGrupo);
            userData.setUserName(userName);
            userData.setTeamName(usuario.getTeamname());
            userData.setAgencia(usuario.getAgencia());
            userData.setCiudad(usuario.getCiudad());
        } catch (Exception e) {
            throw new Exception(ErrorCodes.INTERNAL_ERROR.getMessageError());
        }

        return userData;
    }

    /**
     * @param registro
     * @return
     */
    public String register(Registro registro) throws Exception {

        if (registro == null) {
            throw new Exception(ErrorCodes.DATOS_REGISTRO_NO_DISPONIBLES.getMessageError());
        }

        if (registro.getUsername() == null || registro.getPassword() == null || registro.getTeamName() == null) {
            throw new Exception(ErrorCodes.DATOS_REGISTRO_NO_DISPONIBLES.getMessageError());
        }

        if (registro.getUsername().isEmpty() || registro.getPassword().isEmpty() || registro.getTeamName().isEmpty()) {
            throw new Exception(ErrorCodes.DATOS_REGISTRO_NO_DISPONIBLES.getMessageError());
        }

        if (registro.getUsers() == null || registro.getUsers().isEmpty()) {
            throw new Exception(ErrorCodes.GRUPO_USUARIOS_NO_DISPONIBLES.getMessageError());
        }

        if (registro.getCiudad() == null || registro.getCiudad().isEmpty()) {
            throw new Exception(ErrorCodes.CIUDAD_REQUERIDA.getMessageError());
        }

        if (registro.getAgencia() == null || registro.getAgencia().isEmpty()) {
            throw new Exception(ErrorCodes.AGENCIA_REQUERIDA.getMessageError());
        }

        String error = null;
        try {

            Usuario tmp = getUserInformation(registro.getUsername());
            if (tmp != null) {
                throw new Exception(ErrorCodes.NOMBRE_USUARIO_NO_DISPONIBLE.getMessageError());
            }

            Usuario usuario = new Usuario();
            usuario.setUsername(registro.getUsername());

            String encriptedPsw = md5HashingComponent.encript(registro.getPassword());

            usuario.setTeamname(registro.getTeamName());
            usuario.setPassword(encriptedPsw);
            usuario.setCiudad(registro.getCiudad());
            usuario.setAgencia(registro.getAgencia());

            List<String> listIds = new ArrayList<>();
            for (WWBGameUsuario wwbGameUsuario : registro.getUsers()) {
                listIds.add(wwbGameUsuario.getDocumentId());
            }
            List<Grupo> lstGrupoExist = grupoRespository.findByMemberidIn(listIds);

            if (!lstGrupoExist.isEmpty()) {
                throw new Exception(ErrorCodes.USUARIO_REGISTRADO_EN_OTRO_EQUIPO.getMessageError());
            }

            List<Grupo> lstGrupo = registro.getUsers()
                    .stream()
                    .map(p -> new Grupo(p.getDocumentId(), p.getName(), usuario))
                    .collect(Collectors.toList());

            usuario.setLstGrupo(lstGrupo);
            repository.save(usuario);

            Nivel nivel = new Nivel();
            nivel.setNivel("1");
            nivel.setUsername(registro.getUsername());
            nivelRepository.save(nivel);

        } catch (IllegalStateException e) {
            e.printStackTrace();
            throw new Exception(ErrorCodes.INTERNAL_ERROR.getMessageError());
        } catch (Exception iex) {
            if (error == null) {
                log.error("Se ha presentado un error en el registro", iex);
                throw new Exception(ErrorCodes.INFORMACION_REGISTRO_INVALIDA.getMessageError());
            }
            throw new Exception(error);
        }

        return "Registro Ejecutado Exitosamente";
    }

    /**
     * @param nivelUsuario
     */
    public void saveProgress(NivelUsuario nivelUsuario) throws Exception {

        if (nivelUsuario.getUserName() == null || nivelUsuario.getUserName().isEmpty()) {
            throw new Exception("El identificante del usuario es requerido");
        }

        if (nivelUsuario.getUserName() == null || nivelUsuario.getUserName().isEmpty()) {
            throw new Exception("El nivel es requerido");
        }

        Usuario usuario = this.getUserInformation(nivelUsuario.getUserName());

        if (usuario == null) {
            throw new Exception("Información del usuario incorrecta");
        }

        if (usuario.getUsername().compareTo(nivelUsuario.getUserName()) != 0) {
            throw new Exception("El usuario que esta intentando actualizar el progreso no exite.");
        }

        try {
            Nivel nivel = new Nivel();
            nivel.setUsername(nivelUsuario.getUserName());
            nivel.setNivel(nivelUsuario.getNivel().toString());
            nivelRepository.save(nivel);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
        }
    }

    /**
     * @param nivelUsuario
     */
    public void saveVoto(Puntuacion puntuacionUsuario) throws Exception {

        String error = null;

        if (puntuacionUsuario.getVideo() == null || puntuacionUsuario.getVideo().isEmpty()) {
            error = "El identificante del video es requerido";
            throw new Exception(error);
        }

        if (puntuacionUsuario.getUsuario() == null || puntuacionUsuario.getUsuario().isEmpty()) {
            error = "El id de usuario es requerido";
            throw new Exception(error);
        }

        if (puntuacionUsuario.getAgencia() == null || puntuacionUsuario.getAgencia().isEmpty()) {
            error = "La agencia es requerida";
            throw new Exception(error);
        }

        Usuario usuario = this.getUserInformation(puntuacionUsuario.getUsuario());

        if (usuario == null) {
            error = "Usuario no registrado";
            throw new Exception(error);
        }

        String agenciaSrv = puntuacionUsuario.getAgencia();

        //valido que el usuario no pueda votar por la misma agencia
        if (usuario.getAgencia() != null) {
            if (!usuario.getAgencia().equals(agenciaSrv)) {
                error = "No se puede registrar un voto para la misma agencia";
                throw new Exception(error);
            }
        }

        long total = this.votoQueryRepository.votosByUser(puntuacionUsuario.getUsuario());
        if (total > 1 && (total > usuario.getLstGrupo().size())) {
            error = "EL usuario no puede registrar más votos";
            throw new Exception(error);
        }

        try {
            Voto voto = new Voto();
            voto.setUsuario(puntuacionUsuario.getUsuario());
            voto.setVideo(puntuacionUsuario.getVideo());
            voto.setId(UUID.randomUUID().toString());
            voto.setAgencia(puntuacionUsuario.getAgencia());

            if (puntuacionUsuario.getFecha() == null || puntuacionUsuario.getFecha().isEmpty()) {
                voto.setFecha(new Date());
            } else {
                voto.setFecha(formatoFecha.parse(puntuacionUsuario.getFecha().trim()));
            }

            votoRepository.save(voto);
        } catch (Exception e) {
            if (error == null) {
                e.printStackTrace();
                error = "Se ha presentado un error en el sistema por favor contactese con el administrador.";
            }
            throw new Exception(error);
        }
    }

	/**
	 * Retorna la información del usuario solicitado.
	 * @param userName usario ha ser buscado.
	 * @return informacion del usuario.
	 * @throws Exception
	 */
	private Usuario getUserInformation(String userName) {
        return repository.findById(userName.toUpperCase())
				.orElseThrow(() -> new WWBGeneralException(ErrorCodes.CREDENCIALES_INVALIDAS));
    }

    /**
     * @param username
     * @param password
     * @return
     */

    public Resultado obtenerListado(UserData user, boolean ciudades) throws Exception {

        Resultado resultado = new Resultado();
        resultado.setListado(new ArrayList<Elemento>());

        try {

            if (ciudades) {
                resultado.setTipo("CIUDADES");
                //consulto los registros de ciudades
                Iterable<Ciudad> all = ciudadRepository.findAll();
                for (Ciudad ciudad : all) {
                    resultado.getListado().add(new Elemento(ciudad.getCodigo(), ciudad.getNombre(),
                            ciudad.getCodigo()));
                }
            } else {
                resultado.setTipo("AGENCIAS");

                //consulto los registros de ciudades
                Iterable<Agencia> all = agenciaRepository.findAll();
                if (user == null || user.getCiudad() == null || user.getCiudad().length() < 1) {
                    for (Agencia agencia : all) {
                        resultado.getListado().add(new Elemento(agencia.getCodigo(), agencia.getNombre(),
                                agencia.getCiudad()));
                    }
                } else {
                    //filtro por la ciudad
                    for (Agencia agencia : all) {
                        if (user.getCiudad().equals(agencia.getCiudad())) {
                            resultado.getListado().add(new Elemento(agencia.getCodigo(), agencia.getNombre(),
                                    agencia.getCiudad()));
                        }
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
        }

        return resultado;
    }

    /**
     * @param username
     * @param password
     * @return
     */

    public Resultado obtenerPuntuacion(UserData user) throws Exception {

        Resultado resultado = new Resultado();
        resultado.setListado(new ArrayList<Elemento>());

        try {

            resultado.setTipo("VOTOS");
            //consulto los registros para luego ir acumulando los votos
            Iterable<Voto> all = votoRepository.findAll();

            //llave id del video y valor cantidad de veces votado
            HashMap<String, Integer> acumulado = new HashMap<String, Integer>();
            //llave id del video y valor la agencia al cual pertenece
            HashMap<String, String> laAgencia = new HashMap<String, String>();

            for (Voto voto : all) {
                if (acumulado.containsKey(voto.getVideo())) {
                    int actual = acumulado.get(voto.getVideo());
                    acumulado.replace(voto.getVideo(), ++actual);
                } else {
                    acumulado.put(voto.getVideo(), 1);
                    laAgencia.put(voto.getVideo(), voto.getAgencia());
                }
            }

            for (String id : acumulado.keySet()) {
                resultado.getListado().add(new Elemento(id, String.valueOf(acumulado.get(id)), null, laAgencia.get(id), String.valueOf(acumulado.get(id))));
            }

            laAgencia.clear();
            acumulado.clear();

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Se ha presentado un error en el sistema por favor contactese con el administrador.");
        }

        return resultado;
    }

    public Resultado validarUsuarioGrupo(String userName, String cedula1, String cedula2) throws Exception {
        Resultado resultado = new Resultado();
        if (userName == null) {
            throw new Exception("Parametros invalidos para la petición");
        }

        Usuario usuario = getUserInformation(userName.toUpperCase());
        List<Grupo> grupo = usuario.getLstGrupo();

        if (grupo.isEmpty()) {
            throw new Exception("El usuario no tiene jugadores en la lista");
        }


        if (userName == null || cedula1 == null || cedula2 == null) {
            throw new Exception("Parametros invalidos para la petición");
        }


        Grupo grupoEncontrado = grupo.stream().filter(grupoBuscado -> cedula1.equals(grupoBuscado.getMemberid())).findAny().orElse(null);
        if (grupoEncontrado == null) {
            throw new Exception("El usuario no tiene los jugadores ingresados en la lista");
        }

        grupoEncontrado = grupo.stream().filter(grupoBuscado -> cedula2.equals(grupoBuscado.getMemberid())).findAny().orElse(null);
        if (grupoEncontrado == null) {
            throw new Exception("El usuario no tiene los jugadores ingresados en la lista");
        }

        resultado.setExito(true);

        return resultado;
    }

    public Resultado change(String userName, String password) throws Exception {
        Resultado resultado = new Resultado();
        if (userName == null || password == null) {
            throw new Exception("Parametros invalidos para la petición");
        }

        Usuario usuario = getUserInformation(userName.toUpperCase());

        String encriptedPsw = md5HashingComponent.encript(password);
        usuario.setPassword(encriptedPsw);
        repository.save(usuario);


        resultado.setExito(true);

        return resultado;
    }


    public Resultado getUserName(String identifier) throws Exception {
        Resultado resultado = new Resultado();

        if (identifier == null) {
            throw new Exception("Parametros invalidos para la petición");
        }


        Optional<Grupo> grupo = grupoRespository.findById(identifier);
        if (grupo.isPresent()) {
            resultado.setUserName(grupo.get().getUsuario().getUsername());
            resultado.setExito(true);
        }
        return resultado;
    }

    /**
     * Version 2 del proceso de registro el cual no necesita grupo de usarios
     * y verifica el usuario que se intenta de registrar en un listado de usuarios habilitados.
     * @param registro informacion del usuario a ser registrado.
     * @return
     */
    public String registerV2(final RegistroV2 registro) {

        if (registro == null) {
            throw new WWBGeneralException(ErrorCodes.DATOS_REGISTRO_NO_DISPONIBLES);
        }

        if (StringUtils.isEmpty(registro.getUsername()) || StringUtils.isEmpty(registro.getPassword())) {
            throw new WWBGeneralException(ErrorCodes.DATOS_REGISTRO_NO_DISPONIBLES);
        }

        if (StringUtils.isEmpty(registro.getCiudad())) {
            throw new WWBGeneralException(ErrorCodes.CIUDAD_REQUERIDA);
        }

        if (StringUtils.isEmpty(registro.getAgencia())) {
            throw new WWBGeneralException(ErrorCodes.AGENCIA_REQUERIDA);
        }

        //se realiza la verificacion que el usuario este habilitado para registrarce.
        this.isUSerAllowToRegister(registro.getUsername());

        Optional<Usuario> optUsuario = repository.findById(registro.getUsername());
        if (optUsuario.isPresent()) {
            throw new WWBGeneralException(ErrorCodes.USUARIO_REGISTRADO);
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(registro.getUsername());
        usuario.setPassword(md5HashingComponent.encript(registro.getPassword()));
        usuario.setCiudad(registro.getCiudad());
        usuario.setAgencia(registro.getAgencia());
        repository.save(usuario);

        Nivel nivel = new Nivel();
        nivel.setNivel("1");
        nivel.setUsername(registro.getUsername());
        nivelRepository.save(nivel);
        return "Registro Ejecutado Exitosamente";
    }

    private void isUSerAllowToRegister(final String id) {
        String userHabilitado = usuarioHabilitadoRespository.getUsuarioHabilitadoById(id);
        if(Objects.isNull(userHabilitado)){
            throw new WWBGeneralException(ErrorCodes.USUARIO_NO_HABILITADO);
        }
    }

    /**
     * Version 2 de servicio de login el cual no valida que se tenga asociado un grupo de usuarios.
     * @param userName nombre de usuario
     * @param password pasword del usuario.
     * @return
     */
    public UserData loginV2(String userName, String password) {

        if (StringUtils.isEmpty(userName)) {
            throw new WWBGeneralException(ErrorCodes.CREDENCIALES_NO_ENVIADAS);
        }

        if (StringUtils.isEmpty(password)) {
            throw new WWBGeneralException(ErrorCodes.CREDENCIALES_NO_ENVIADAS);
        }

        Usuario usuario = getUserInformation(userName);
        String encriptedPsw = md5HashingComponent.encript(password);

        if (usuario.getPassword().compareTo(encriptedPsw) != 0) {
            throw new WWBGeneralException(ErrorCodes.CREDENCIALES_INVALIDAS);
        }

        NivelUsuario nivelUsuario = nivelRepository.findById(userName)
                .map(nivel -> NivelUsuario.builder()
                        .nivel(Integer.parseInt(nivel.getNivel()))
                        .userName(nivel.getUsername())
                        .build())
                .orElseGet(() -> new NivelUsuario());

        UserData userData = UserData.builder()
                .userName(userName)
                .nivel(nivelUsuario)
                .agencia(usuario.getAgencia())
                .ciudad(usuario.getCiudad())
                .build();

        return userData;
    }
}
