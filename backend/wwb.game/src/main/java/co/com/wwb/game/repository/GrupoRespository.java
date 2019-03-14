package co.com.wwb.game.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import co.com.wwb.game.db.Grupo;
import co.com.wwb.game.db.Usuario;

public interface GrupoRespository extends JpaRepository<Grupo, String>{
	public List<Grupo> findByMemberidIn(List<String>  memberId);
}
