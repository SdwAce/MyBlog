package com.adobe.blogengine.DTO;

//dto for any comment request
public class CommentRequest {
    private String body;
    private String postId;

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}

