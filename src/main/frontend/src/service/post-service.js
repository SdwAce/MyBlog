import axios from "axios";
import AuthService from "./auth-service";
import React from "react";

const API_URL = "http://localhost:8080/myblog/post/";

//apis for post service
class PostService{
    getAllPosts() {
        return axios.get(API_URL + "showall").then(response => {
             return response.data;
        });
    }

    getPostsByUser(userId) {
        return axios.post(API_URL + "showbyuser",{
            userId
        },{
            headers:{
                Authorization : AuthService.getToken().toString()
            }
        }).then(response => {
            return response.data;
        });
    }
    createPost(title,body){
        return axios.post(API_URL + "create",{
            title,
            body,
        },{
            headers:{
                Authorization : AuthService.getToken().toString()
            }
        }).then(response => {
            JSON.stringify(response.data)
            return response.data;
        });
    }
}

export default new PostService();