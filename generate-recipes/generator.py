import requests
import json

food_api_url = "https://www.themealdb.com/api/json/v1/1/random.php"
number_of_recipes = 25

recipes = []

for i in range(number_of_recipes):
    print(i + 1, "/", number_of_recipes)

    resp = requests.get(url=food_api_url)
    data = resp.json()["meals"][0]

    ingredients = []
    j = 1
    while ("strIngredient" + str(j)) in data and data["strIngredient" + str(j)]:
        ingredients.append(data["strIngredient" + str(j)] + " - " + data["strMeasure" + str(j)])
        j = j + 1

    directions = data["strInstructions"].replace(". ", ".").replace("\r", "").replace("\n", "").split(".")
    if not directions[len(directions) - 1]:
        directions.pop()

    recipe = {
        "title": data["strMeal"],
        "description": data["strArea"] + " " + data["strCategory"],
        "ingredients": ingredients,
        "directions": directions,
        "imageName": ""
    }

    recipes.append(recipe)

with open('recipes.json', 'w') as f:
    json.dump(recipes, f)
