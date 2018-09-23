package co.com.wwb.game.db;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name="Grupo")
@Table(name ="GRUPO")
public class Grupo {
	
	@Id
	private String memberid;
	
	private String membername;
	
	public Grupo() {
		
	}
	
	public Grupo(String memberid, String membername, Usuario usuario) {
		super();
		this.memberid = memberid;
		this.membername = membername;
		this.usuario = usuario;
	}

	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username")
    private Usuario usuario;

	public String getMemberid() {
		return memberid;
	}

	public void setMemberid(String memberid) {
		this.memberid = memberid;
	}

	public String getMembername() {
		return membername;
	}

	public void setMembername(String membername) {
		this.membername = membername;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	
}
