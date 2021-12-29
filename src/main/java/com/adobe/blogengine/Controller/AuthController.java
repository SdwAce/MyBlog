package com.adobe.blogengine.Controller;

import com.adobe.blogengine.DTO.AuthRequest;
import com.adobe.blogengine.Service.AuthenticationResponse;
import com.adobe.blogengine.Service.LoginService;
import com.adobe.blogengine.Service.RegisterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@RestController
@RequestMapping("/myblog/auth")

public class AuthController {
    @Autowired
    private RegisterService registerService;
    @Autowired
    private LoginService loginService;


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRequest registerRequest) {
        try {
            if (registerService.register(registerRequest)) {
                return ResponseEntity.ok("User successfully registered!");
            }

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("User has already been registered!",HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthRequest loginRequest) {
        return loginService.login(loginRequest);
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login(HttpServletRequest request) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        AuthRequest loginRequest = mapper.readValue(request.getReader(),AuthRequest.class);
//        try {
//            if (loginService.login(loginRequest)) {
//                HttpSession session = request.getSession();
//                session.setAttribute("username",loginRequest.getUsername());
//                return ResponseEntity.ok("User successfully login!");
//            }else{
//                return new ResponseEntity<>("Invalid username or password!",HttpStatus.UNAUTHORIZED);
//            }
//        }catch (Exception e){
//            return new ResponseEntity<>("Internal Server error!",HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//    @GetMapping("/login")
//    public ResponseEntity<String> loginvalidation(HttpServletRequest request) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        HttpSession session = request.getSession(false);
//        if (session == null){
//            //String userId = session.getAttribute("username").toString();
//            return new ResponseEntity<>("Invalid session!",HttpStatus.FORBIDDEN);
//        }
//        return new ResponseEntity<>(HttpStatus.OK);
//
//    }

}
