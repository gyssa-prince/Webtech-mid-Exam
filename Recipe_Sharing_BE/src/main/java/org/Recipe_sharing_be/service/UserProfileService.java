package org.Recipe_sharing_be.service;

import org.Recipe_sharing_be.model.UserProfile;
import org.Recipe_sharing_be.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    public Optional<UserProfile> getUserProfileById(Long id) {
        return userProfileRepository.findById(id);
    }

    @Transactional
    public UserProfile updateUserProfile(Long id, UserProfile userProfileDetails) {
        return userProfileRepository.findById(id).map(userProfile -> {
            userProfile.setName(userProfileDetails.getName());
            userProfile.setBio(userProfileDetails.getBio());
            userProfile.setAvatarUrl(userProfileDetails.getAvatarUrl());
            return userProfileRepository.save(userProfile);
        }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User profile not found"));
    }

    @Transactional
    public boolean deleteUserProfile(Long id) {
        if (userProfileRepository.existsById(id)) {
            userProfileRepository.deleteById(id);
            return true;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User profile not found");
    }
}
