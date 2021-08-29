package co.com.wwb.game.db;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="Usuario_Habilitado")
@Table(name="USUARIO_HABILITADO")
public class UsuarioHabilitado {

    @Id
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
