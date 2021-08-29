package co.com.wwb.game.repository;

import co.com.wwb.game.db.Voto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;


public interface VotoQueryRepository extends Repository<Voto,String> {

	@Query("select count(v.id) as id from Voto v  where v.usuario = :usuario")
	long votosByUser( @Param("usuario") String usuario);

	

}
