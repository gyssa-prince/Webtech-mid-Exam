package org.Recipe_sharing.controller;

import org.Recipe_sharing.dto.AuthRequest;
import org.Recipe_sharing.dto.AuthResponse;
import org.Recipe_sharing.model.Role;
import org.Recipe_sharing.model.User;
import org.Recipe_sharing.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        // Assign default roles; you can enhance this to allow role assignment via the request body
        Set<Role> roles = Set.of(new Role("USER")); // Assuming you have a ROLE_USER
        user.setRoles(roles); // Assign roles to the user
        authService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody AuthRequest authRequest) {
        AuthResponse response = authService.authenticateUser(authRequest.getUsername(), authRequest.getPassword());
        // Return the response with appropriate HTTP status
        return ResponseEntity.ok(response);
    }
}
