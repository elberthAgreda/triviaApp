package co.com.wwb.game;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebConfigurer extends WebMvcConfigurerAdapter {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/rest/wwbgame/api/**")
				.allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS")
				.allowedOrigins("http://localhost:4200");
	}

}