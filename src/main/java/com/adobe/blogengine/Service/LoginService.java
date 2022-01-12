package com.adobe.blogengine.Service;

import com.adobe.blogengine.DTO.AuthRequest;
import com.adobe.blogengine.DTO.AuthResponse;
import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Repository.UserRepository;
import com.adobe.blogengine.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    //login method
    public AuthResponse login(AuthRequest loginRequest) throws AuthenticationException{
        //authenticate user and store in SecurityContext
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
        //generate JWT token after success authentication
        String authenticationToken = jwtUtil.createToken(authenticate);
        BlogUser user = userRepository.findByUsername(loginRequest.getUsername()).orElseThrow(() ->
                new UsernameNotFoundException("No user found with username " + loginRequest.getUsername()));

        return new AuthResponse(authenticationToken,user.getId(), loginRequest.getUsername());

    }

    //get current user stored in security context
    public Optional<User> getCurrentUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.
                getContext().getAuthentication().getPrincipal();
        return Optional.of(principal);
    }


}
