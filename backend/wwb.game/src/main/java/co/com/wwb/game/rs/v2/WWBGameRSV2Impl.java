package co.com.wwb.game.rs.v2;

import co.com.wwb.game.model.Elemento;
import co.com.wwb.game.model.Resultado;
import co.com.wwb.game.model.UserData;
import co.com.wwb.game.model.v2.RegistroV2;
import co.com.wwb.game.service.WWBGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/rest/wwbgame/api/v2")
@RequiredArgsConstructor
public class WWBGameRSV2Impl implements WWBGameRSV2 {

    private final WWBGameService wwbGameService;

    @PostMapping(value = "/register")
    public ResponseEntity register(@RequestBody @Valid final RegistroV2 registro) {
        return ResponseEntity.ok(wwbGameService.registerV2(registro));
    }

    @PostMapping(value = "/login")
    public ResponseEntity login(@RequestBody @Valid final UserData userData) {
        return ResponseEntity.ok(wwbGameService.loginV2(userData.getUserName(), userData.getPassword()));
    }

    @GetMapping(value = "/cities/{city-code}/agencies")
    public ResponseEntity<Resultado> getAgencies(@PathVariable("city-code") String cityCode) {
        List<Elemento> agencias = wwbGameService.getAgenciasByCity(cityCode);
        Resultado resultado = new Resultado();
        resultado.setTipo("AGENCIAS");
        resultado.setListado(agencias);
        resultado.setExito(true);
        return ResponseEntity.ok(resultado);
    }
}
