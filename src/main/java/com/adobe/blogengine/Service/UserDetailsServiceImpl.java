package com.adobe.blogengine.Service;


import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        //find user object by username
        BlogUser user = userRepository.findByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException("No user found with username " + username));
        //wrap our user to the user object of spring security, pass in a based authority called "ROLE_USER"
        return new User(user.getUsername(),
                user.getPassword(),
                true, true, true, true,getAuthorities("ROLE_USER")
                );
    }

    //create a simple GrantedAuthority object with "ROLE_USER"
    private Collection<? extends GrantedAuthority> getAuthorities(String role_user) {
        return Collections.singletonList(new SimpleGrantedAuthority(role_user));
    }

}
