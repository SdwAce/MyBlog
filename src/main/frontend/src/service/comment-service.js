import axios from "axios";
import AuthService from "./auth-service";
const API_URL = "http://localhost:8080/myblog/comment/";

//apis for comment service
class CommentService{
    getComments(postId) {
        return axios.get(API_URL + "get/" + postId).then(response => {
            return response.data;
        });
    }
    addComment(postId,body) {
        return axios.post(API_URL + "add", {
            postId : postId,
            body : body
        },{
            headers:{
                Authorization : AuthService.getToken().toString()
            }
        })
    }
}
export default new CommentService();