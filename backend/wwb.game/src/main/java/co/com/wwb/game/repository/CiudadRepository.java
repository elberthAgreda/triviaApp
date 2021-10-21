package co.com.wwb.game.repository;

import org.springframework.data.repository.CrudRepository;

import co.com.wwb.game.db.Ciudad;

import java.util.List;

public interface CiudadRepository extends CrudRepository<Ciudad, String>{
    List<Ciudad> findAllByOrderByNombreAsc();

}
