package co.com.wwb.game.model;

import java.util.List;

public class UserData {
	
	private NivelUsuario nivel;
	private List<WWBGameUsuario> users;
	private String userName;
	private String teamName;
	private String password;
	private String ciudad;
	private String agencia;
	private String cedula1;
	private String cedula2;
	
	
	public String getCedula1() {
		return cedula1;
	}
	public void setCedula1(String cedula1) {
		this.cedula1 = cedula1;
	}
	public String getCedula2() {
		return cedula2;
	}
	public void setCedula2(String cedula2) {
		this.cedula2 = cedula2;
	}
	public NivelUsuario getNivel() {
		return nivel;
	}
	public void setNivel(NivelUsuario nivel) {
		this.nivel = nivel;
	}
	public List<WWBGameUsuario> getUsers() {
		return users;
	}
	public void setUsers(List<WWBGameUsuario> users) {
		this.users = users;
	}
	
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
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
