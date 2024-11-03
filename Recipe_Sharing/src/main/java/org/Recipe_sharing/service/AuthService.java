package org.Recipe_sharing.service;

import org.Recipe_sharing.dto.AuthResponse;
import org.Recipe_sharing.model.User;
import org.Recipe_sharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user) {
        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Save the user
        userRepository.save(user);
    }

    public AuthResponse authenticateUser(String username, String password) {
        // Find user by username
        Optional<User> optionalUser = userRepository.findByUsername(username); // Assuming this method exists in UserRepository
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Check if the password matches
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Return a success message upon successful authentication
                return new AuthResponse("Authentication successful for user: " + username);
            }
        }
        // Return an error message if authentication fails
        return new AuthResponse("Invalid username or password");
    }
}
