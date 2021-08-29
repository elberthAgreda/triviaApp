package co.com.wwb.game.repository;

import co.com.wwb.game.db.UsuarioHabilitado;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

public interface UsuarioHabilitadoRespository extends Repository<UsuarioHabilitado, String> {

    @Query("select username as id from Usuario_Habilitado v  where v.username = :username")
    String getUsuarioHabilitadoById( @Param("username") String username);
}
