package co.com.wwb.game.db;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity(name="Usuario")
@Table(name="USUARIO")
public class Usuario {
	
	@Id
	private String username;

	private String password;
	
	private String teamname;
	
	private String ciudad;
	
	private String agencia;
	
	@OneToMany(mappedBy="usuario", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Grupo> lstGrupo = new ArrayList<Grupo>();

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTeamname() {
		return teamname;
	}

	public void setTeamname(String teamname) {
		this.teamname = teamname;
	}

	public List<Grupo> getLstGrupo() {
		return lstGrupo;
	}

	public void setLstGrupo(List<Grupo> lstGrupo) {
		this.lstGrupo = lstGrupo;
	}

	/**
	 * @return the ciudad
	 */
	public String getCiudad() {
		return ciudad;
	}

	/**
	 * @param ciudad the ciudad to set
	 */
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	/**
	 * @return the agencia
	 */
	public String getAgencia() {
		return agencia;
	}

	/**
	 * @param agencia the agencia to set
	 */
	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}
	
	
}
