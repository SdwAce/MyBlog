package com.adobe.blogengine.Service;

import com.adobe.blogengine.DTO.AuthRequest;
import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //register user
    public boolean register(AuthRequest request)  {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return false;
        }
        BlogUser user = new BlogUser();
        user.setUsername(request.getUsername());
        user.setPassword(encodePassword(request.getPassword()));
        userRepository.save(user);
        return true;
    }

    //encode the password using the encoder
    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
