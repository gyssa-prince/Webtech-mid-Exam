package org.Recipe_sharing_be.controller;

import org.Recipe_sharing_be.model.User;
import org.Recipe_sharing_be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> credentials) {
        var user = userService.findByUsername(credentials.get("username"));
        if (user.isPresent() && passwordEncoder.matches(credentials.get("password"), user.get().getPassword())) {
            return ResponseEntity.ok("Successfully logged in");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Successfully logged out");
    }
}
