package co.com.wwb.game.repository;

import co.com.wwb.game.db.Agencia;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AgenciaRepository extends CrudRepository<Agencia, String> {

    List<Agencia> findByCiudad(final String ciudad);

}
