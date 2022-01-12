package com.adobe.blogengine.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for any authentication response
@Data
@AllArgsConstructor
public class AuthResponse {
    private String authenticationToken;
    private String id;
    private String username;

}
