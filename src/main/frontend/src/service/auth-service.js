import axios from "axios";
const API_URL = "http://localhost:8080/myblog/auth/";


class AuthService{
    register(username, password) {
        return axios.post(API_URL + "register", {
            username,
            password
        });
    }
    login(username, password) {
        return axios.post(API_URL + "login", {
            username,
            password
        })
        .then(response => {
            if (response.data.authenticationToken){
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    getUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    logout() {
        localStorage.removeItem("user");
    }
}
export default new AuthService();