dummyDataDir=src/main/resources/dummy/data
mkdir -p ${dummyDataDir}
python3 generate-recipes/generator.py
mv recipes.json ${dummyDataDir}