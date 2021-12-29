package com.adobe.blogengine.Controller;

import com.adobe.blogengine.DTO.CommentRequest;
import com.adobe.blogengine.DTO.CommentResponse;
import com.adobe.blogengine.Model.Comment;
import com.adobe.blogengine.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/myblog/comment")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @GetMapping("/get/{postId}")
    public ResponseEntity<Collection<CommentResponse>> getComments(@PathVariable String postId){
        Optional<Collection<Comment>> comments = commentService.findCommentsByPost(postId);
        if (!comments.isPresent()){
            return ResponseEntity.noContent().build();
        }else{
            return new ResponseEntity<Collection<CommentResponse>>(comments.get()
                    .stream()
                    .map(e -> CommentResponse.mapCommentDTO(e))
                    .collect(Collectors.toList()), HttpStatus.OK);
        }
    }

    @PostMapping(value = "/add/{postId}")
    public ResponseEntity<CommentResponse> addComment(@RequestBody CommentRequest commentRequest){
        try {
            CommentResponse returnComment = commentService.addComment(commentRequest);
            return new ResponseEntity<>(returnComment, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
