package co.com.wwb.game.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Registro {
    private String username;
    private String password;
    private String ciudad;
    private String agencia;
    private String teamName;
    private List<WWBGameUsuario> users;
}
