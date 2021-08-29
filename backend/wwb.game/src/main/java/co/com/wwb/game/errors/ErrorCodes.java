package co.com.wwb.game.errors;

import lombok.Getter;

@Getter
public enum ErrorCodes {

    CREDENCIALES_NO_ENVIADAS(400,"Por favor suministre los datos de inicio de sesión"),
    CREDENCIALES_INVALIDAS (400,"Las Credenciales de autenticación son incorrectas"),
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
    INTERNAL_ERROR(5000,"Se ha presentado un error en el sistema por favor contactese con el administrador.");

    private int code;
    private String messageError;

    ErrorCodes(int code, String messageError) {
        this.code = code;
        this.messageError = messageError;
    }


}
