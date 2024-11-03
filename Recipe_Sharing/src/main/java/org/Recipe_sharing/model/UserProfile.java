package org.Recipe_sharing.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username; // Add username field
    private String password; // Add password field
    private String name; // Add name field
    private String bio; // Add bio field
    private String avatarUrl; // Add avatar URL field

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    // Constructors
    public UserProfile() {}

    public UserProfile(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name; // Add getter for name
    }

    public void setName(String name) { // Add setter for name
        this.name = name;
    }

    public String getBio() {
        return bio; // Add getter for bio
    }

    public void setBio(String bio) { // Add setter for bio
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl; // Add getter for avatar URL
    }

    public void setAvatarUrl(String avatarUrl) { // Add setter for avatar URL
        this.avatarUrl = avatarUrl;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
