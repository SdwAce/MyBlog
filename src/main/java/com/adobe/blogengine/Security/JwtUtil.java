package com.adobe.blogengine.Security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.security.Key;

@Service
public class JwtUtil {
    private Key key;
    //crete the key at start and reuse it every time we generate a JSON web token
    @PostConstruct
    public void init(){
        key = Keys.secretKeyFor(SignatureAlgorithm.HS512);//create a key using the algorithm and digitally sign the web token
    }
    public String createToken(Authentication authentication){
        User pincipal = (User)authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(pincipal.getUsername())
                .signWith(key) //create
                .compact();
    }

    public boolean validateToken(String jwt){
        Jwts.parser().setSigningKey(key).parseClaimsJws(jwt);
        return true;
    }

    public String getUserName(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }
}
