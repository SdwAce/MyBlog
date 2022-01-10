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
                JSON.stringify(response.data)
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    getUser() {
        const user = localStorage.getItem('user');
        return user != undefined ? JSON.parse(user) : undefined;
    }
    getToken() {
        // console.log(JSON.parse(localStorage.getItem('user')));
        return "Bearer " + JSON.parse(localStorage.getItem('user')).authenticationToken.toString();
    }

    logout() {
        localStorage.removeItem("user");
    }
}
export default new AuthService();