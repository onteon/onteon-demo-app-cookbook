# Scripts
- `./scripts/build.sh` - builds war and docker image.
- `./scripts/generate-recipes.sh` - Generates random recipes. You need python3 and libraries specified in `generate-recipes/requirements.txt`. After generating recipes, you need to specify names of images in `src/main/resources/dummy/data/recipes.json` file.
- `./scripts/run-locally.sh` - runs app locally on port 8080.
- `./scripts/run-docker.sh` - runs app in docker with port 8080.

# Usage
When launched, the app creates random users and random recipes. User credentials are printed to the console.

# Address
http://localhost:8080/cookbook/