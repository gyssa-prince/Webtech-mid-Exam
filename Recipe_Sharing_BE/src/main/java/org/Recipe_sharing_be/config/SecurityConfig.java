package org.Recipe_sharing_be.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Disable CSRF for simplicity during testing
                .authorizeHttpRequests()
                .requestMatchers("/auth/signup", "/auth/signin").permitAll() // Allow these without authentication
                .anyRequest().authenticated() // Protect all other endpoints
                .and()
                .httpBasic(); // Optional: Enable basic authentication for testing

        return http.build();
    }
}
