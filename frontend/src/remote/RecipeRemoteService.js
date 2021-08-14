import axios from "axios";
import {API_BASE_URL} from "../properties";

export function getUserRecipes(page, pageSize) {
    return axios.get(`${API_BASE_URL}/api/recipe/user/me?page=${page - 1}&pageSize=${pageSize}`);
}

export function getRecipeById(recipeId) {
    return axios.get(`${API_BASE_URL}/api/recipe/${recipeId}`);
}

export function deleteById(recipeId) {
    return axios.delete(`${API_BASE_URL}/api/recipe/${recipeId}`);
}