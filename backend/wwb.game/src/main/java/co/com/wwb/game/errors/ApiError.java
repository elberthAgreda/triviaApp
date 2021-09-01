package co.com.wwb.game.errors;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ApiError {

    private int code;
    private String errorMsg;
}
