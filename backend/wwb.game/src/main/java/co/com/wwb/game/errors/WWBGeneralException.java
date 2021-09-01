package co.com.wwb.game.errors;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WWBGeneralException extends RuntimeException {

    private ErrorCodes errorCodes;
}
