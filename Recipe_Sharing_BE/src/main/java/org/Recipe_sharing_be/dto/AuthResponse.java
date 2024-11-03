package org.Recipe_sharing_be.dto;

public class AuthResponse {
    private String message;

    public AuthResponse(String message) {
        this.message = message;
    }

    // Getter
    public String getMessage() {
        return message;
    }
}

