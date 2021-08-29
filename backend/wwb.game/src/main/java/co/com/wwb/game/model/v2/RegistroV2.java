package co.com.wwb.game.model.v2;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistroV2 {
    private String username;
    private String password;
    private String ciudad;
    private String agencia;
}
