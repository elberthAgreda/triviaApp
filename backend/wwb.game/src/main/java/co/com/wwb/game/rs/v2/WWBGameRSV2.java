package co.com.wwb.game.rs.v2;

import co.com.wwb.game.model.UserData;
import co.com.wwb.game.model.v2.RegistroV2;
import org.springframework.http.ResponseEntity;

public interface WWBGameRSV2 {

    /**
     * Version 2 del servicio de registro el cual no solicta un grupo de usuarios asociado
     * y verifica que el usuario que intenta registrarce este habilitado.
     *
     * @param registro Informacion del usuario a registrar
     */
    ResponseEntity register(RegistroV2 registro);

    /**
     * Version 2 de servicio de login el cual no valida que se tenga asociado un grupo de usuarios.
     *
     * @param user crediciales de autenticacion.
     * @return Informacion del usuario autenticado.
     */
    ResponseEntity<UserData> login(UserData user);
}
