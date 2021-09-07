package co.com.wwb.game.errors;

import lombok.Getter;

@Getter
public enum ErrorCodes {

    CREDENCIALES_NO_ENVIADAS(400,"Por favor suministre los datos de inicio de sesión"),
    CREDENCIALES_INVALIDAS (401,"Las Credenciales de autenticación son incorrectas"),
    DATOS_REGISTRO_NO_DISPONIBLES(400,"La información de registro es requerida"),
    GRUPO_USUARIOS_NO_DISPONIBLES(400,"EL grupo de usuarios es requerida"),
    CIUDAD_REQUERIDA(400,"La ciudad es requerida"),
    AGENCIA_REQUERIDA(400,"La Agencia es requerida"),
    NOMBRE_USUARIO_NO_DISPONIBLE(403,"EL nombre de usuario ingresado no esta disponible"),
    USUARIO_REGISTRADO_EN_OTRO_EQUIPO(403,"Alguno de los jugadores ya se encuentra incluido en otro equipo"),
    INFORMACION_REGISTRO_INVALIDA(400,"La información sumistrada en el registro es invalida por favor validar los datos del Grupo que intenta de registrar"),
    USUARIO_REGISTRADO(403, "El usuario ya se encuentra registrado"),
    ERROR_REGISTRO(500,"La información sumistrada en el registro es invalida por favor validar los datos."),
    USUARIO_NO_HABILITADO(403,"Usuario No habilitado para registro."),
    VIDEO_REQUERIDO(400, "El identificante del video es requerido"),
    USUARIO_REQUERIDO(400, "El id de usuario es requerido"),
    USUARIO_NO_REGISTRADO(403, "Usuario No registrado"),
    VOTO_INVALIDO(403, "No se puede registrar un voto para la misma agencia"),
    MAX_VOTOS_USUARIO_ERROR(403, "Voto no registado, Haz alcanzado el número maximo de votos permitidos por usuario"),
    VOTO_VIDE_YA_REGISTRADO(409, "Ya haz registrado un voto para el mimo video, por favor selecciona un nuevo video."),
    DATOS_REGISTRO_VOTOS_REQUERIDOS(400, "N0 se ha obtenido data valida para registrar el voto."),
    CIUDAD_SIN_AGENCIAS(404, "La ciudad seleccionada no tiene agencias asignadas"),
    INTERNAL_ERROR(500,"Se ha presentado un error en el sistema por favor contactese con el administrador.");

    private int code;
    private String messageError;

    ErrorCodes(int code, String messageError) {
        this.code = code;
        this.messageError = messageError;
    }
}
