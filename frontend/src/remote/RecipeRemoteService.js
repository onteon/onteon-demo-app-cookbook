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

export function addRecipe(title, description, ingredients, directions, image) {
    const formData = new FormData();

    const imageFile = document.getElementById("imageInput");

    formData.append("image", imageFile.files[0]);
    formData.append('data', new Blob([JSON.stringify({
        title: title,
        description: description,
        ingredients: ingredients,
        directions: directions
    })], {
        type: "application/json"
    }));


    return axios.post(
        `${API_BASE_URL}/api/recipe`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
}