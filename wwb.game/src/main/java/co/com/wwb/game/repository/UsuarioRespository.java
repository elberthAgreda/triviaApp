package co.com.wwb.game.repository;

import org.springframework.data.repository.CrudRepository;

import co.com.wwb.game.db.Usuario;

public interface UsuarioRespository extends CrudRepository<Usuario, String>{

}
