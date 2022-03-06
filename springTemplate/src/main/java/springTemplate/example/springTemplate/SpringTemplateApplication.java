package springTemplate.example.springTemplate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springTemplate.example.springTemplate.models.Role;
import springTemplate.example.springTemplate.models.User;
import springTemplate.example.springTemplate.services.UserService;

import java.util.ArrayList;

@SpringBootApplication
public class SpringTemplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringTemplateApplication.class, args);
	}

	@Bean
	PasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("*")
						.allowedHeaders("*")
						.allowedMethods("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS");
			}
		};
	}

	/*@Bean
	CommandLineRunner run(UserService userService){
		return args -> {
			if(!userService.getRole("ROLE_ADMIN")){
				userService.saveRole(new Role(null,"ROLE_ADMIN"));
			}
			if(!userService.getRole("ROLE_USER")){
				userService.saveRole(new Role(null,"ROLE_USER"));
			}

			userService.saveUser(new User(null,"Jorgem","Jorgem","SCP2810",new ArrayList<>()));
			userService.addRole("Jorgem","ROLE_ADMIN");
		};
	}*/
}
