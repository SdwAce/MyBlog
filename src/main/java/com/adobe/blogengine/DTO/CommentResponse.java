package com.adobe.blogengine.DTO;

import com.adobe.blogengine.Model.Comment;

import java.util.Date;

public class CommentResponse {
    private String id;
    private String username;
    private String body;
    private Date create_date;
    private String postId;
    private String userId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public static CommentResponse mapCommentDTO(Comment comment){
        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(comment.getId());
        commentResponse.setUsername(comment.getAuthor().getUsername());
        commentResponse.setBody(comment.getBody());
        commentResponse.setCreate_date(comment.getCreateDate());
        commentResponse.setPostId(comment.getPost().getId());
        commentResponse.setUserId(comment.getAuthor().getId());
        return commentResponse;
    }
}
