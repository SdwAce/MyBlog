package com.adobe.blogengine.Service;

import com.adobe.blogengine.DTO.CommentRequest;
import com.adobe.blogengine.DTO.CommentResponse;
import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Model.Comment;
import com.adobe.blogengine.Model.Post;
import com.adobe.blogengine.Repository.CommentRepository;
import com.adobe.blogengine.Repository.PostRepository;
import com.adobe.blogengine.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private LoginService loginService;
    @Autowired
    private UserRepository userRepository;

    public Optional<Collection<Comment>> findCommentsByPost(String id) {
        return commentRepository.findAllByPostId(id);
    }

    public CommentResponse addComment(CommentRequest commentRequest) throws Exception {
        Optional<Post> post= postRepository.findById(commentRequest.getPostId());
        if (!post.isPresent()){
            throw new Exception("No valid post found!");
        }
        Comment comment = new Comment();
        comment.setBody(commentRequest.getBody());
        User loggedInUser = loginService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        BlogUser user = userRepository.findByUsername(loggedInUser.getUsername()).orElseThrow(() ->
                new UsernameNotFoundException("No user found with username " + loggedInUser.getUsername()));
        comment.setAuthor(user);
        comment.setPost(post.get());
        commentRepository.save(comment);
        return CommentResponse.mapCommentDTO(comment);

    }

}
