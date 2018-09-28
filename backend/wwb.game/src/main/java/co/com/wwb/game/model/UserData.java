package co.com.wwb.game.model;

import java.util.List;

public class UserData {
	
	private NivelUsuario nivel;
	private List<WWBGameUsuario> users;
	private String userName;
	private String teamName;
	private String password;
	
	
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
	
	
}
