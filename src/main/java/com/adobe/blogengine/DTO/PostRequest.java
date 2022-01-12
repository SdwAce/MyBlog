package com.adobe.blogengine.DTO;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//dto for any request about posts
@JsonIgnoreProperties(ignoreUnknown = true) //ignore unknown json properties
public class PostRequest {
    private String userId;
    private String title;
    private String body;

    public String getUserId() {
        return userId;
    }

    public void setUserid(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }


}
