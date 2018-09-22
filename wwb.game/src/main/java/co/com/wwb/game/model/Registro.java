package co.com.wwb.game.model;

import java.util.List;

public class Registro {
	
	private String username;
	private String password;
	private String teamName;
	private List<WWBGameUsuario> users;
	
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
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public List<WWBGameUsuario> getUsers() {
		return users;
	}
	public void setUsers(List<WWBGameUsuario> users) {
		this.users = users;
	}
	
	
	
	
}
