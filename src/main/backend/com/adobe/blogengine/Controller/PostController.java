package com.adobe.blogengine.Controller;

import com.adobe.blogengine.DTO.PostRequest;
import com.adobe.blogengine.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/myblog/post")

public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/showall")
    public ResponseEntity<?> getAllPost(){
        try{
            return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Something wrong with the server...", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/showbyuser")
    public ResponseEntity<?> getAllPostByUser(@RequestBody PostRequest postDto){
        try{
            return new ResponseEntity<>(postService.getPostsByUser(postDto), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Something wrong with the server...", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/create")
    public ResponseEntity createPost(@RequestBody PostRequest postDto) {
        try{
            postService.createPost(postDto);
            return new ResponseEntity("Blog has successfully been added!",HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("Something wrong with the server...", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}


