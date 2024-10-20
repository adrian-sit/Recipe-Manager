CREATE DATABASE RecipeManager;

CREATE TABLE Ingredients(
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE Steps(
    ID SERIAL PRIMARY KEY,
    Number INTEGER NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Tool VARCHAR(20),
    Time INTEGER DEFAULT 0,
    Active_cooking BOOLEAN DEFAULT FALSE
);

CREATE TABLE Recipes(
    ID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Type VARCHAR(255) NOT NULL,
);

CREATE TABLE Recipes_Steps(
    Recipe_ID INTEGER REFERENCES Recipes(ID),
    Steps_ID INTEGER REFERENCES Steps(ID)
);

CREATE TABLE Steps_Ingredients(
    Steps_ID INTEGER REFERENCES Steps(ID),
    Ingredient_ID INTEGER REFERENCES Ingredients(ID)
)

CREATE TABLE Inventory(
    IngredientID INT REFERENCES Ingredient(ID)
);

-- Attributes + ID for filtering feature
-- Time + Active cooking + Tools for future task scheduling feature