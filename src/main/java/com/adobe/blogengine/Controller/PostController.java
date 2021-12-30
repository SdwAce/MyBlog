package com.adobe.blogengine.Controller;

import com.adobe.blogengine.DTO.PostDTO;
import com.adobe.blogengine.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/myblog/post")

public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/showall")
    public ResponseEntity<List<PostDTO>> getAllPost(){
        return new ResponseEntity<>(postService.getAllPosts(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity createPost(@RequestBody PostDTO postDto) {
        postService.createPost(postDto);
        return new ResponseEntity(HttpStatus.OK);
    }

}


