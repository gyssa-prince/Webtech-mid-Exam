package org.Recipe_sharing.controller;

import org.Recipe_sharing.model.UserProfile;
import org.Recipe_sharing.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/user-profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // Get user profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long id) {
        Optional<UserProfile> userProfile = userProfileService.getUserProfileById(id);
        return userProfile.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update user profile
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable Long id, @Valid @RequestBody UserProfile userProfileDetails) {
        Optional<UserProfile> updatedUserProfile = userProfileService.updateUserProfile(id, userProfileDetails);
        return updatedUserProfile.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Delete user profile by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        boolean deleted = userProfileService.deleteUserProfile(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
