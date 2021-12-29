package com.adobe.blogengine.Service;

import com.adobe.blogengine.DTO.PostDTO;
import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Model.Post;
import com.adobe.blogengine.Repository.PostRepository;
import com.adobe.blogengine.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.userdetails.User;


import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoginService loginService;

    @Transactional
    public List<PostDTO> getAllPosts(){
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(e -> mapPostDto(e)).collect(Collectors.toList());
    }

    private PostDTO mapPostDto(Post post) {
        PostDTO postDto = new PostDTO();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setBody(post.getBody());
        return postDto;
    }

    @Transactional
    public void createPost(PostDTO postDto) {
        Post post = mapToPost(postDto);
        postRepository.save(post);
    }

    private Post mapToPost(PostDTO postDto) {
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setBody(postDto.getBody());
        User loggedInUser = loginService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        BlogUser user = userRepository.findByUsername(loggedInUser.getUsername()).orElseThrow(() ->
                new UsernameNotFoundException("No user found with username " + loggedInUser.getUsername()));
        post.setUser(user);
        return post;
    }

}
