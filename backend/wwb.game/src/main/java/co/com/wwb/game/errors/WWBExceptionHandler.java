package co.com.wwb.game.errors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class WWBExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ApiError> handler(MethodArgumentNotValidException e){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ApiError.builder().errorMsg("La petición no es valida").build());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiError> handler(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiError.builder()
                        .code(500)
                        .errorMsg(ErrorCodes.INTERNAL_ERROR.getMessageError())
                        .build());
    }

    @ExceptionHandler({WWBGeneralException.class})
    public ResponseEntity<ApiError> handler(WWBGeneralException e){
        return ResponseEntity.status(HttpStatus.valueOf(e.getErrorCodes().getCode()))
                .body(ApiError.builder()
                        .code(e.getErrorCodes().getCode())
                        .errorMsg(e.getErrorCodes().getMessageError())
                        .build());
    }
}
