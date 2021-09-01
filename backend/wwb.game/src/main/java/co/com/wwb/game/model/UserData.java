package co.com.wwb.game.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
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

}
