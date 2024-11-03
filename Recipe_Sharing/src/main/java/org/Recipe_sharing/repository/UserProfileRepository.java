package org.Recipe_sharing.repository;

import org.Recipe_sharing.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    // Custom method to find a UserProfile by username
    UserProfile findByUsername(String username);
}
