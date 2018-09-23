package co.com.wwb.game.model;

import java.util.List;

public class UserData {
	
	private NivelUsuario nivel;
	private List<WWBGameUsuario> users;
	private String usuerName;
	
	
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
	public String getUsuerName() {
		return usuerName;
	}
	public void setUsuerName(String usuerName) {
		this.usuerName = usuerName;
	}

}
