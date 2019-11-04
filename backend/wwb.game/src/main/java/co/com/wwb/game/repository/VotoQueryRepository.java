package co.com.wwb.game.repository;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import co.com.wwb.game.db.Voto;


public interface VotoQueryRepository extends Repository<Voto,String> {

	@Query("select count(v.id) as id from Voto v  where v.usuario = :usuario")
	long votosByUser( @Param("usuario") String usuario);

	

}
