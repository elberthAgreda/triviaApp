package co.com.wwb.game.repository;

import org.springframework.data.repository.CrudRepository;

import co.com.wwb.game.db.Voto;

import java.util.List;

public interface VotoRepository extends CrudRepository<Voto, String>{

    /**
     * Busca los votos efectuados por usuario
     * @param usuario
     * @return
     */
    List<Voto> findVotosByUsuario(final String usuario);

}
