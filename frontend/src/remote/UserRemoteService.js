import axios from "axios";
import {API_BASE_URL} from "../properties";

export function signUp(username, password, confirmedPassword) {
    return axios.post(`${API_BASE_URL}/api/user`, {
        username: username,
        password: password,
        confirmedPassword: confirmedPassword
    });
}

export function getPrincipal() {
    return axios.get(`${API_BASE_URL}/api/user/me`);
}