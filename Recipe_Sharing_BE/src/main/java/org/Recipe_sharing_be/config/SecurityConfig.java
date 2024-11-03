package org.Recipe_sharing_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity; consider enabling for production
                .authorizeRequests(authorize -> authorize
                        .anyRequest().authenticated() // Require authentication for all requests
                )
                .httpBasic(); // Enable HTTP Basic authentication (or customize as needed)

        return http.build();
    }
}
