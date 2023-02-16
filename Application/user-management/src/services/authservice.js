import axios from "axios";

const API_URL = "http://localhost:3000/api/";

const login = (user) => {
    return axios
        .post(API_URL + "login", user)
        .then((response) => {
              if (response.data.token) {
                localStorage.setItem("TOKEN", response.data.token);
              }
            return response.data;
        });
};

const verify = () => {
    const token = localStorage.getItem("TOKEN");
    return axios
        .post(API_URL + "profile", {
            headers: {
                authorization: token
            }
        })
        .then((response) => {
            //   if (response.data.username) {
            //     localStorage.setItem("user", JSON.stringify(response.data));
            //   }
            console.log(response.data.result);
            return response.data;
        });
};


const logout = () => {
    localStorage.removeItem("TOKEN");
};

const AuthService = {
    verify,
    login,
    logout,
}

export default AuthService;