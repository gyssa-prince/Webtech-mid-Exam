package org.Recipe_sharing.service;

import org.Recipe_sharing.model.User;
import org.Recipe_sharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null); // Return null if not found
    }

    // Additional methods can be added as needed
}
