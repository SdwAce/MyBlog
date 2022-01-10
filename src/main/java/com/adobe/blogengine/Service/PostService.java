package com.adobe.blogengine.Service;

import com.adobe.blogengine.DTO.PostRequest;
import com.adobe.blogengine.DTO.PostResponse;
import com.adobe.blogengine.Model.BlogUser;
import com.adobe.blogengine.Model.Post;
import com.adobe.blogengine.Repository.PostRepository;
import com.adobe.blogengine.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;


import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
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
    public List<PostResponse> getAllPosts() throws Exception{
        List<Post> posts = postRepository.findAllByOrderByCreateDateDesc().get();
        return posts.stream().map(e -> mapPostDto(e)).collect(Collectors.toList());
    }

    @Transactional
    public List<PostResponse> getPostsByUser(PostRequest postDto){
        List<Post> posts = postRepository.findAllByUserIdOrderByCreateDateDesc(postDto.getUserId()).get();
        return posts.stream().map(e -> mapPostDto(e)).collect(Collectors.toList());
    }

    private PostResponse mapPostDto(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setBody(post.getBody());
        response.setAuthor(post.getUser().getUsername());
        response.setComments(post.getComments());
        DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy");
        String strDate = dateFormat.format(post.getCreateDate());
        response.setCreateDate(strDate);
        return response;
    }


    @Transactional
    public void createPost(PostRequest request) throws Exception{
        Post post = mapToPost(request);
        postRepository.save(post);
    }

    private Post mapToPost(PostRequest request) throws Exception{
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setBody(request.getBody());
        User loggedInUser = loginService.getCurrentUser().orElseThrow(() -> new IllegalArgumentException("User Not Found"));
        BlogUser user = userRepository.findByUsername(loggedInUser.getUsername()).orElseThrow(() ->
                new UsernameNotFoundException("No user found with username " + loggedInUser.getUsername()));
        post.setUser(user);
        return post;
    }

}
