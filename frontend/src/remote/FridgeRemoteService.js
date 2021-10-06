import axios from "axios";
import {API_BASE_URL} from "../properties";

export function getMyFridge() {
    return axios.get(`${API_BASE_URL}/api/fridge/user/me`);
}