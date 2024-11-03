package org.Recipe_sharing_be.controller;

import org.Recipe_sharing_be.model.UserProfile;
import org.Recipe_sharing_be.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user-profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // Get user profile by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long id) {
        return userProfileService.getUserProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update user profile
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable Long id, @Valid @RequestBody UserProfile userProfileDetails) {
        try {
            UserProfile updatedUserProfile = userProfileService.updateUserProfile(id, userProfileDetails);
            return ResponseEntity.ok(updatedUserProfile);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user profile by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        try {
            boolean deleted = userProfileService.deleteUserProfile(id);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
